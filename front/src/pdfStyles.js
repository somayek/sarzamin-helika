import { StyleSheet, Font } from "@react-pdf/renderer";
import VazirRegular from "./assets/fonts/Vazir-Regular.ttf";

// Register Font
Font.register({
  family: "Vazir-Regular",
  src: VazirRegular,
});

const styles = StyleSheet.create({
  page: {
    // flexDirection: "column",
    padding: 30,
    fontFamily: "Vazir-Regular",
    direction: "rtl",
    textAlign: "right",
    border: "1px solid #0a0a0a",
  },
  section: {
    marginBottom: 15,
    textAlign: "right",
  },
  h1: {
    fontSize: 20,
    fontFamily: "Vazir-Regular",
    color: "#634528",
    textAlign: "right", // Ensures proper alignment
    paddingVertical: 10,
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Vazir-Regular",
    textAlign: "right",
    marginBottom: 5,
  },
  subheading: {
    fontSize: 14,
    fontFamily: "Vazir-Regular",
    marginBottom: 5,
    textAlign: "right",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row-reverse", // RTL-friendly
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    textAlign: "right",
  },
  tableRowNoBorder: {
    flexDirection: "row-reverse", // RTL-friendly
    textAlign: "right",
  },
  rtlList: {
    textAlign: "right",
    flexDirection: "column",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  rtlListItem: {
    textAlign: "right",
    fontSize: 12,
    fontFamily: "Vazir-Regular",
    marginBottom: 3,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10, // Adds spacing above and below the line
    width: "100%",
  },
  totalCharges: {
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Vazir-Regular",
    marginTop: 10,
    textAlign: "right",
  },
  tableCellNoBorder: {
    fontSize: 12,
    fontFamily: "Vazir-Regular",
    padding: 5,
    borderRightWidth: 0,
    textAlign: "right",
  },
  tableCell: {
    fontSize: 12,
    fontFamily: "Vazir-Regular",
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "right",
    width: "50%",
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Vazir-Regular",
    padding: 5,
    backgroundColor: "#f2f2f2",
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "right",
    width: "50%",
  },
});

export default styles;
