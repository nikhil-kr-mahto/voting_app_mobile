import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { colors } from '../utils/colors';
import { FontSizes } from '../utils/fonts';
import { Metrics } from '../utils/metrics';
import CommonText from './commonText';

export type Voter = {
    _id: string;
    id: string;
    sr_no: number;
    epic_no: string;
    name: string;
    relation_type: string;
    relation_name: string;
    age: number;
    gender: string;
    house_no: string;
    ward_no: number;
    booth_no: number;
    status: string;
};

type Props = { voter: Voter; onMarkPolled: (id: string) => Promise<void> };

const InfoChip = ({ label, value }: { label: string; value: string | number }) => (
    <View style={styles.chip}>
        <CommonText style={styles.chipLabel}>{label}</CommonText>
        <CommonText style={styles.chipValue} numberOfLines={1}>{String(value)}</CommonText>
    </View>
);

const VoterCard = ({ voter, onMarkPolled }: Props) => {
    const [marking, setMarking] = useState(false);

    const handleMark = async () => {
        setMarking(true);
        try {
            await onMarkPolled(voter.id);
        } finally {
            setMarking(false);
        }
    };

    return (
    <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
            <View style={styles.srBadge}>
                <CommonText style={styles.srText}>#{voter.sr_no}</CommonText>
            </View>
            <View style={styles.headerCenter}>
                <CommonText style={styles.name} numberOfLines={1}>{voter.name}</CommonText>
                <CommonText style={styles.relation} numberOfLines={1}>
                    {voter.relation_type}: {voter.relation_name}
                </CommonText>
            </View>
            <View style={[styles.statusBadge, voter.status === 'pending' ? styles.pending : styles.done]}>
                <CommonText style={[styles.statusText, voter.status === 'pending' ? styles.pendingText : styles.polledText]}>{voter.status}</CommonText>
            </View>
        </View>

        <View style={styles.divider} />

        {/* Epic number */}
        <View style={styles.epicRow}>
            <CommonText style={styles.epicLabel}>EPIC No.</CommonText>
            <CommonText style={styles.epicValue}>{voter.epic_no}</CommonText>
        </View>

        <View style={styles.divider} />

        {/* Info chips */}
        <View style={styles.chipsRow}>
            <InfoChip label="Age" value={voter.age} />
            <InfoChip label="Gender" value={voter.gender} />
            <InfoChip label="Ward" value={voter.ward_no} />
            <InfoChip label="Booth" value={voter.booth_no} />
        </View>

        {/* House */}
        <View style={styles.houseRow}>
            <CommonText style={styles.houseIcon}>🏠</CommonText>
            <CommonText style={styles.houseText} numberOfLines={1}>{voter.house_no}</CommonText>
        </View>

        {voter.status !== 'polled' && (
            <TouchableOpacity
                style={[styles.pollButton, marking && styles.pollButtonDisabled]}
                onPress={handleMark}
                disabled={marking}
                activeOpacity={0.8}
            >
                <CommonText style={styles.pollButtonText}>
                    {marking ? 'Updating...' : 'Mark as POLLED'}
                </CommonText>
            </TouchableOpacity>
        )}
    </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.black2,
        borderRadius: moderateScale(14),
        padding: Metrics._16,
        marginBottom: Metrics._12,
        borderWidth: 1,
        borderColor: '#2A2A2A',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Metrics._10,
    },
    srBadge: {
        backgroundColor: colors.primary,
        borderRadius: moderateScale(8),
        paddingHorizontal: Metrics._8,
        paddingVertical: Metrics._4,
        minWidth: moderateScale(44),
        alignItems: 'center',
    },
    srText: {
        fontSize: FontSizes._12,
        fontWeight: '700',
        color: colors.black,
    },
    headerCenter: {
        flex: 1,
    },
    name: {
        fontSize: FontSizes._16,
        fontWeight: '700',
        color: colors.white,
    },
    relation: {
        fontSize: FontSizes._12,
        color: colors.grey6,
        marginTop: Metrics._2,
    },
    statusBadge: {
        borderRadius: moderateScale(6),
        paddingHorizontal: Metrics._8,
        paddingVertical: Metrics._3,
    },
    pending: {
        backgroundColor: '#3A2E00',
    },
    pendingText: {
        color: colors.warning,
    },
    done: {
        backgroundColor: '#0D2E1A',
    },
    polledText: {
        color: colors.success,
    },
    statusText: {
        fontSize: FontSizes._10,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    divider: {
        height: 1,
        backgroundColor: '#2A2A2A',
        marginVertical: Metrics._10,
    },
    epicRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    epicLabel: {
        fontSize: FontSizes._12,
        color: colors.grey6,
        fontWeight: '500',
    },
    epicValue: {
        fontSize: FontSizes._12,
        color: colors.primary,
        fontWeight: '700',
        letterSpacing: 1,
    },
    chipsRow: {
        flexDirection: 'row',
        gap: Metrics._8,
        marginBottom: Metrics._10,
    },
    chip: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        borderRadius: moderateScale(8),
        paddingVertical: Metrics._6,
        paddingHorizontal: Metrics._4,
        alignItems: 'center',
    },
    chipLabel: {
        fontSize: FontSizes._10,
        color: colors.grey6,
        marginBottom: Metrics._2,
    },
    chipValue: {
        fontSize: FontSizes._12,
        color: colors.white,
        fontWeight: '600',
    },
    houseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Metrics._6,
        backgroundColor: '#1E1E1E',
        borderRadius: moderateScale(8),
        paddingVertical: Metrics._6,
        paddingHorizontal: Metrics._10,
    },
    houseIcon: {
        fontSize: FontSizes._12,
    },
    houseText: {
        fontSize: FontSizes._12,
        color: colors.grey2,
        flex: 1,
    },
    pollButton: {
        marginTop: Metrics._12,
        backgroundColor: colors.success,
        borderRadius: moderateScale(10),
        paddingVertical: Metrics._12,
        alignItems: 'center',
    },
    pollButtonDisabled: {
        backgroundColor: colors.disabled,
    },
    pollButtonText: {
        fontSize: FontSizes._14,
        fontWeight: '700',
        color: colors.white,
    },
});

export default VoterCard;
