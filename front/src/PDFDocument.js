import React from "react";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import VazirRegular from "./assets/fonts/Vazir-Regular.ttf";
import styles from "./pdfStyles";

Font.register({
  family: "Vazir-Regular",
  src: VazirRegular,
});

const PDFDocument = ({ request, traceId }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.h1}>خدمات کنسولی سرزمین - هلیکا</Text>

        <View style={styles.tableRowNoBorder}>
          <Text style={[styles.tableCellNoBorder, { width: "33%" }]}>
            :جزییات درخواست آقای / خانم
          </Text>
          <Text style={[styles.tableCellNoBorder, { width: "67%" }]}>
            {request.name || "-"}
          </Text>
        </View>

        <Text>{traceId} :شناسه پیگیری</Text>
        <View style={styles.line} />
        <Text style={styles.subheading}>مستندات لازم</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCellHeader, { width: "8%" }]}>#</Text>
            <Text style={[styles.tableCellHeader, { width: "92%" }]}>سند</Text>
          </View>

          {request.documents.map(
            (docItem, idx) =>
              docItem.text && (
                <View key={idx} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: "8%" }]}>
                    {idx + 1}
                  </Text>
                  <Text style={[styles.tableCell, { width: "92%" }]}>
                    {docItem.text}
                  </Text>
                </View>
              )
          )}
        </View>
      </View>

      {request.charges && (
        <View style={styles.section}>
          <Text style={styles.subheading}>هزینه ها</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCellHeader}>شرح</Text>
              <Text style={styles.tableCellHeader}>(CAD)مبلغ</Text>
            </View>
            {request.charges.map((charge, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text style={styles.tableCell}>{charge.description}</Text>
                <Text style={styles.tableCell}>{charge.amount}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      <View style={styles.tableRowNoBorder}>
        <Text style={[styles.tableCellNoBorder, { width: "15%" }]}>
          : هزینه کل
        </Text>
        <Text style={[styles.tableCellNoBorder, { width: "85%" }]}>
          {request.charges
            .reduce((acc, charge) => acc + parseFloat(charge.amount), 0)
            .toFixed(2)}{" "}
          CAD
        </Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
