package com.yourapp.printer

import android.Manifest
import android.bluetooth.BluetoothAdapter
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.ActivityCompat

import com.facebook.react.bridge.*

import BpPrinter.mylibrary.BluetoothConnectivity
import BpPrinter.mylibrary.BpPrinter
import BpPrinter.mylibrary.Scrybe
import java.util.ArrayList

class PrinterModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    private var bluetoothConnectivity: BluetoothConnectivity? = null
    private var bpPrinter: BpPrinter? = null

    override fun getName(): String {
        return "PrinterModule"
    }

    init {
        bluetoothConnectivity = BluetoothConnectivity(object : Scrybe {
            override fun onDiscoveryComplete(printers: ArrayList<String>?) {}
            override fun onUsbConnected() {}
        })
    }

    /**
     * Get paired printers
     */
    @ReactMethod
    fun getPairedPrinters(promise: Promise) {

        try {

            val printers =
                bluetoothConnectivity?.pairedPrinters

            val array = WritableNativeArray()

            if (printers is ArrayList<*>) {
                printers.forEach {
                    if (it is String) {
                        array.pushString(it)
                    }
                }
                promise.resolve(array)
            } else if (printers is String) {
                promise.reject("PERMISSION_DENIED", printers)
            } else {
                promise.resolve(array)
            }

        } catch (e: Exception) {
            promise.reject(
                "PRINTER_LIST_ERROR",
                e.message
            )
        }
    }

    /**
     * Connect printer
     */
    @ReactMethod
    fun connectPrinter(
        printerName: String,
        promise: Promise
    ) {

        try {

            bluetoothConnectivity?.setPrinterConnectionListener(
                object :
                    BluetoothConnectivity.PrinterConnectionListener {

                    override fun onPrinterConnected() {

                        bpPrinter =
                            bluetoothConnectivity?.aemPrinter

                        promise.resolve(
                            "Printer Connected"
                        )
                    }

                    override fun onPrinterConnectionFailed(
                        errorMessage: String
                    ) {

                        promise.reject(
                            "CONNECTION_FAILED",
                            errorMessage
                        )
                    }
                }
            )

            bluetoothConnectivity?.connectToPrinter(
                printerName
            )

        } catch (e: Exception) {

            promise.reject(
                "CONNECT_ERROR",
                e.message
            )
        }
    }

    /**
     * Print Text
     */
    @ReactMethod
    fun printText(
        text: String,
        promise: Promise
    ) {

        try {

            if (bpPrinter == null) {

                promise.reject(
                    "NO_PRINTER",
                    "Printer not connected"
                )

                return
            }

            bpPrinter?.Initialize_Printer()

            bpPrinter?.POS_Set_Text_alingment(
                0x01
            )

            bpPrinter?.print(text)

            bpPrinter?.setCarriageReturn()
            bpPrinter?.setCarriageReturn()

            promise.resolve(
                "Printed Successfully"
            )

        } catch (e: Exception) {

            promise.reject(
                "PRINT_ERROR",
                e.message
            )
        }
    }

    /**
     * Print Bill
     */
    @ReactMethod
    fun printBill(
        promise: Promise
    ) {

        try {

            if (bpPrinter == null) {

                promise.reject(
                    "NO_PRINTER",
                    "Printer not connected"
                )

                return
            }

            bpPrinter?.Initialize_Printer()

            bpPrinter?.POS_Set_Text_alingment(
                0x01
            )

            bpPrinter?.print(
                "TEST BILL\n"
            )

            bpPrinter?.print(
                "-----------------------------\n"
            )

            bpPrinter?.print(
                "Burger      2 x 100 = 200\n"
            )

            bpPrinter?.print(
                "Pizza       1 x 250 = 250\n"
            )

            bpPrinter?.print(
                "-----------------------------\n"
            )

            bpPrinter?.print(
                "TOTAL: 450\n"
            )

            bpPrinter?.setCarriageReturn()
            bpPrinter?.setCarriageReturn()

            promise.resolve(
                "Bill Printed"
            )

        } catch (e: Exception) {

            promise.reject(
                "PRINT_BILL_ERROR",
                e.message
            )
        }
    }

    /**
     * Disconnect printer
     */
    @ReactMethod
    fun disconnectPrinter(
        promise: Promise
    ) {

        try {

            bluetoothConnectivity?.disConnectPrinter()

            promise.resolve(
                "Printer disconnected"
            )

        } catch (e: Exception) {

            promise.reject(
                "DISCONNECT_ERROR",
                e.message
            )
        }
    }
}