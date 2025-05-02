import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../Components/Styles/colors';
import _vw from '../../../utils/sizeConversors';
import { trunc } from '../../../utils/mathForDummies';

type BarChartProps = {
  data: { label: string; value: number }[];
};

export default function BarChart({ data }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  const MAX_VALUE = Math.max(...data.map(item => item.value));

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.barContainer}>
          <View
            style={[
              styles.bar,
              {
                height: `${trunc((item.value / MAX_VALUE) * 100)}%`,
                backgroundColor: colors.white_blue,
              },
            ]}
          />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: _vw(30),
    padding: _vw(2),

    borderBottomWidth: _vw(0.5),
    borderColor: colors.font,
    paddingTop: _vw(10),
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: _vw(1),
  },
  bar: {
    width: _vw(5),
    borderTopLeftRadius: _vw(1),
    borderTopRightRadius: _vw(1),
  },
  label: {
    marginTop: _vw(0.2),
    fontSize: _vw(4),
    color: colors.font,
    textAlign: 'center',
  },
  noDataContainer: {
    height: _vw(30),
    justifyContent: 'center',
    alignItems: 'center',
    padding: _vw(2),
  },
  noDataText: {
    fontSize: _vw(5),
    color: colors.font,
  },
});
