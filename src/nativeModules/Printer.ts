import { NativeModules } from 'react-native';

const { PrinterModule } = NativeModules;

export default {

    getPairedPrinters: (): Promise<string[]> =>
        PrinterModule.getPairedPrinters(),

    connectPrinter: (
        printerName: string,
    ): Promise<string> =>
        PrinterModule.connectPrinter(
            printerName,
        ),

    printText: (
        text: string,
    ): Promise<string> =>
        PrinterModule.printText(text),

    printBill: (): Promise<string> =>
        PrinterModule.printBill(),

    disconnectPrinter: (): Promise<string> =>
        PrinterModule.disconnectPrinter(),
};