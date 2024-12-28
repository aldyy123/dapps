import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface CryptoDetailProps {
    route: { params: { id: string } };
}

interface CryptoDetail {
    name: string;
    current_price: number;
    price_change_24h: number;
    market_cap: number;
    prices: [number, number][];
}

export default function CryptoDetailScreen({ route }: CryptoDetailProps) {
    const { id } = route.params;
    const [detailData, setDetailData] = useState<CryptoDetail | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchCryptoDetail = async (cryptoId: string) => {
        try {
            const [detailResponse, chartResponse] = await Promise.all([
                fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`),
                fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=7&interval=daily`)
            ]);

            const detailData = await detailResponse.json();
            const chartData = await chartResponse.json();

            setDetailData({
                name: detailData.name,
                current_price: detailData.market_data.current_price.usd,
                price_change_24h: detailData.market_data.price_change_percentage_24h,
                market_cap: detailData.market_data.market_cap.usd,
                prices: chartData.prices
            });
        } catch (error) {
            console.error('Error fetching crypto details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoDetail(id);
    }, [id]);

    if (loading || !detailData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const chartData = {
        labels: detailData.prices.map((price) => {
            const date = new Date(price[0]);
            return `${date.getMonth() + 1}/${date.getDate()}`;
        }),
        datasets: [{
            data: detailData.prices.map((price) => price[1])
        }]
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{detailData.name}</Text>
                <Text style={styles.price}>${detailData.current_price.toFixed(2)}</Text>
                <Text style={[
                    styles.priceChange,
                    { color: detailData.price_change_24h >= 0 ? '#4CAF50' : '#FF4444' }
                ]}>
                    {detailData.price_change_24h.toFixed(2)}%
                </Text>
            </View>

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Price History (7 Days)</Text>
                <LineChart
                    data={chartData}
                    width={Dimensions.get('window').width - 32}
                    height={220}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={styles.chart}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    priceChange: {
        fontSize: 18,
        marginTop: 4,
    },
    chartContainer: {
        padding: 16,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    }
});
