// import {
//     useEffect,
//     useState,
// } from 'react';

// import {
//     View,
//     Button,
// } from 'react-native';

// import Printer from './nativeModules/Printer';

// const App = () => {

//     const [printers, setPrinters] =
//         useState<string[]>([]);

//     useEffect(() => {

//         loadPrinters();

//     }, []);

//     const loadPrinters = async () => {

//         try {

//             const data =
//                 await Printer.getPairedPrinters();

//             setPrinters(data);

//         } catch (e) {
//             console.log(e);
//         }
//     };

//     const connectAndPrint =
//         async () => {

//             try {

//                 await Printer.connectPrinter(
//                     printers[0],
//                 );

//                 await Printer.printBill();

//             } catch (e) {

//                 console.log(e);
//             }
//         };

//     return (
//         <View>

//         <Button
//         title= "Print"
//     onPress = { connectAndPrint }
//         />

//         </View>
//   );
// };

// export default App;