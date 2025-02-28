import React from "react";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import styles from "./pdfStyles"; // Import the styles you already have

// Registering the font
import VazirRegular from "./assets/fonts/Vazir-Regular.ttf";
Font.register({
  family: "Vazir-Regular",
  src: VazirRegular,
});

const PDFDocument = ({ requests, traceId }) => {
  const allDocuments = requests.flatMap(
    (request, index) =>
      request.documents?.map((doc) => ({ ...doc, requestIndex: index + 1 })) ||
      []
  );
  const allCharges = requests.flatMap(
    (request, index) =>
      request.charges?.map((charge) => ({
        ...charge,
        requestIndex: index + 1,
      })) || []
  );

  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.h1}>خدمات کنسولی سرزمین - هلیکا</Text>{" "}
        <Text>{traceId} :شناسه پیگیری</Text>
        {allDocuments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>مستندات لازم</Text>
            {requests.map(
              (request, index) =>
                request.documents &&
                request.documents.length > 0 && (
                  <View key={index} style={styles.section}>
                    <View style={styles.tableRowNoBorder}>
                      <Text
                        style={[styles.tableCellNoBorder, { width: "33%" }]}
                      >
                        : درخواست شماره {index + 1}  -  {request.application}  برای 
                      </Text>
                      <Text
                        style={[styles.tableCellNoBorder, { width: "67%" }]}
                      >
                        {request.name || "-"}
                      </Text>
                    </View>
                    <View style={styles.table}>
                      <View style={styles.tableRow}>
                        <Text style={[styles.tableCellHeader, { width: "8%" }]}>
                          #
                        </Text>
                        <Text
                          style={[styles.tableCellHeader, { width: "92%" }]}
                        >
                          سند
                        </Text>
                      </View>
                      {request.documents.map(
                        (docItem, idx) =>
                          docItem.text && (
                            <View key={idx} style={styles.tableRow}>
                              <Text style={[styles.tableCell, { width: "8%" }]}>
                                {idx + 1}
                              </Text>
                              <Text
                                style={[styles.tableCell, { width: "92%" }]}
                              >
                                {docItem.text}
                              </Text>
                            </View>
                          )
                      )}
                    </View>
                  </View>
                )
            )}
          </View>
        )}
        {/* Charges Section */}
        {allCharges.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>هزینه ها</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCellHeader]}>درخواست</Text>
                <Text style={[styles.tableCellHeader]}>شرح</Text>
                <Text style={[styles.tableCellHeader]}>مقدار</Text>
              </View>
              {allCharges.map((charge, i) => (
                <View key={i} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{charge.requestIndex}</Text>
                  <Text style={styles.tableCell}>{charge.description}</Text>
                  <Text style={styles.tableCell}>
                    {charge.amount} {charge.currency}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.tableRowNoBorder}>
              <Text style={[styles.tableCellNoBorder, { width: "15%" }]}>
                : هزینه کل
              </Text>
              <Text style={[styles.tableCellNoBorder, { width: "85%" }]}>
                {allCharges
                  .reduce((acc, charge) => acc + parseFloat(charge.amount), 0)
                  .toFixed(2)}{" "}
                CAD
              </Text>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFDocument;
