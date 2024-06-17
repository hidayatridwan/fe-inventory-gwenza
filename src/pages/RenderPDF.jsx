import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { apiUrl } from "../utils/helper";

const styles = StyleSheet.create({
  viewer: {
    width: "100vw",
    height: "100vh",
  },
  page: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    flexWrap: "wrap",
  },
  section: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 2,
    margin: 3,
    border: "1px solid #000",
  },
  img: {
    width: 80,
    height: 80,
  },
});

function generateNumbers(n) {
  return Array.from({ length: n }, (_, i) => i + 1);
}

function RenderPDF({ qty, qrCode, productCode }) {
  return (
    <Document>
      <Page size="A7" style={styles.page}>
        {qty.map((num) => (
          <View key={num} style={styles.section}>
            <Image src={`${apiUrl}/qrcodes/${qrCode}`} style={styles.img} />
            <Text>{productCode}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}

export default function App() {
  const { qty, qrCode, productCode } = useParams();

  return (
    <PDFViewer style={styles.viewer}>
      <RenderPDF
        qty={generateNumbers(qty)}
        qrCode={qrCode}
        productCode={productCode}
      />
    </PDFViewer>
  );
}
