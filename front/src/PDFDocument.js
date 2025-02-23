import React from "react";
import { Document, Page, Text, View, Font } from "@react-pdf/renderer";
import VazirRegular from "./assets/fonts/Vazir-Regular.ttf";
import styles from "./pdfStyles";

Font.register({
  family: "Vazir-Regular",
  src: VazirRegular,
});

const PDFDocument = ({ request }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.h1}>خدمات کنسولی سرزمین - هلیکا</Text>
        <Text style={styles.heading}>
          جزییات درخواست آقای / خانم: {request.name || "-"}
        </Text>
        <View style={styles.line} />
        <Text style={styles.subheading}>مستندات لازم</Text>
        <View style={styles.rtlList}>
          {request.documents.map(
            (docItem, idx) =>
              docItem.text && (
                <Text key={idx} style={styles.rtlListItem}>
                  {`${idx + 1} - ${docItem.text}`}
                </Text>
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
              <Text style={styles.tableCellHeader}>مبلغ (CAD)</Text>
            </View>
            {request.charges.map((charge, idx) => (
              <View style={styles.tableRow} key={idx}>
                <Text style={styles.tableCell}>{`هزینه ${idx + 1}`}</Text>
                <Text style={styles.tableCell}>{charge}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.totalCharges}>
          هزینه کل: CAD{" "}
          {request.charges
            .reduce((acc, charge) => acc + parseFloat(charge), 0)
            .toFixed(2)}
        </Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
