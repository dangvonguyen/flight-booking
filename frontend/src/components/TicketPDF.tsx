import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { TicketDetails } from '../types/ticket';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingId: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '30%',
    fontSize: 12,
    color: '#666666',
  },
  value: {
    width: '70%',
    fontSize: 12,
  },
  route: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  airport: {
    width: '45%',
  },
  arrow: {
    width: '10%',
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    borderTop: 1,
    paddingTop: 10,
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
});

interface TicketPDFProps {
  ticket: TicketDetails;
}

export const TicketPDF: React.FC<TicketPDFProps> = ({ ticket }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Vé Máy Bay</Text>
        <Text style={styles.bookingId}>Mã đặt chỗ: {ticket.bookingId}</Text>
      </View>

      {/* Passenger Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin hành khách</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Họ tên:</Text>
          <Text style={styles.value}>{ticket.passengerName}</Text>
        </View>
      </View>

      {/* Flight Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thông tin chuyến bay</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Chuyến bay:</Text>
          <Text style={styles.value}>{ticket.flightNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Cổng:</Text>
          <Text style={styles.value}>{ticket.gate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ghế:</Text>
          <Text style={styles.value}>{ticket.seat}</Text>
        </View>
      </View>

      {/* Route Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hành trình</Text>
        <View style={styles.route}>
          <View style={styles.airport}>
            <Text style={styles.value}>{ticket.from}</Text>
          </View>
          <View style={styles.arrow}>
            <Text>→</Text>
          </View>
          <View style={styles.airport}>
            <Text style={styles.value}>{ticket.to}</Text>
          </View>
        </View>
      </View>

      {/* Time Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thời gian</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Ngày bay:</Text>
          <Text style={styles.value}>{ticket.departureDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Giờ bay:</Text>
          <Text style={styles.value}>{ticket.departureTime}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Vui lòng có mặt tại sân bay ít nhất 2 tiếng trước giờ khởi hành</Text>
        <Text>Mọi thắc mắc xin liên hệ hotline: 1900 xxxx</Text>
      </View>
    </Page>
  </Document>
);

export default TicketPDF; 