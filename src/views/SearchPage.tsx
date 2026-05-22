import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { colors } from "../utils/colors";
import { Metrics } from "../utils/metrics";
import CommonText from "../common/commonText";
import CustomTextInput from "../common/customInput";
import { FontSizes } from "../utils/fonts";
import CommonButton from "../common/commonButton";
import VoterCard, { Voter } from "../common/VoterCard";
import { searchApi, updateVoterStatus } from "../api/authApis";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [voters, setVoters] = useState<Voter[]>([]);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        setHasSearched(true);
        try {
            const data = await searchApi(searchQuery, 1);
            console.log("data===", data);

            if (data.success) {
                setVoters(data.data.voters);
                setCurrentPage(1);
                setTotalPages(data.data.totalPages);
            }
        } catch (error: any) {
            console.log('Search error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        if (loadingMore || currentPage >= totalPages) return;
        const nextPage = currentPage + 1;
        setLoadingMore(true);
        try {
            const data = await searchApi(searchQuery, nextPage);
            if (data.success) {
                setVoters(prev => [...prev, ...data.data.voters]);
                setCurrentPage(nextPage);
            }
        } catch (error: any) {
            console.log('Load more error:', error.message);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleMarkPolled = async (id: string) => {
        try {
            const data = await updateVoterStatus(id);
            if (data.success) {
                setVoters(prev =>
                    prev.map(v => v.id === id ? { ...v, status: 'polled' } : v)
                );
            }
        } catch (error: any) {
            console.log('Update status error:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <CommonText style={styles.title}>Search Page</CommonText>

            <CustomTextInput
                label=""
                value={searchQuery}
                placeholder="Epic/Name/Serial Number"
                onChangeText={(text) => setSearchQuery(text)}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyLabel="search"
                onSubmitEditing={handleSearch}
            />
            <CommonButton
                label="Find"
                onPress={handleSearch}
                fullWidth={true}
            />

            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <CommonText style={styles.loaderText}>Searching...</CommonText>
                </View>
            )}

            {!loading && hasSearched && voters.length === 0 && (
                <View style={styles.emptyContainer}>
                    <CommonText style={styles.emptyText}>No voters found</CommonText>
                </View>
            )}

            {!loading && voters.length > 0 && (
                <FlatList
                    data={voters}
                    keyExtractor={(item, index) => `${item._id}-${index}`}
                    renderItem={({ item }) => <VoterCard voter={item} onMarkPolled={handleMarkPolled} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.4}
                    style={styles.list}
                    ListFooterComponent={
                        <View style={styles.footerLoader}>
                            {loadingMore && (
                                <ActivityIndicator size="small" color={colors.primary} />
                            )}
                        </View>
                    }
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        padding: Metrics._16,
        paddingTop: Metrics._32,
    },
    title: {
        fontSize: FontSizes._28,
        color: colors.white,
        fontWeight: 'bold',
        marginBottom: Metrics._24,
    },

    loaderContainer: {
        alignItems: 'center',
        paddingVertical: Metrics._32,
        gap: Metrics._10,
    },
    loaderText: {
        color: colors.grey6,
        fontSize: FontSizes._14,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: Metrics._48,
    },
    emptyText: {
        color: colors.grey6,
        fontSize: FontSizes._16,
    },
    listContent: {
        paddingTop: Metrics._12,
        paddingBottom: Metrics._32,
    },
    list: {
        flex: 1,
    },
    footerLoader: {
        paddingVertical: Metrics._20,
        alignItems: 'center',
    },
});

export default SearchPage;
