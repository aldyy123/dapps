import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    RefreshControl,
    Image,
    TouchableOpacity,
} from 'react-native';
import { formatCurrency } from '../utils/formatters';

interface CryptoItem {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    market_cap_rank: number;
}

export default function CryptoList({ navigation }: { navigation: any }) {
    const [cryptoData, setCryptoData] = useState<CryptoItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCryptoData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
            );
            const data = await response.json();
            setCryptoData(data);
        } catch (err) {
            setError('Failed to fetch crypto data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCryptoData();
        // Set up interval for real-time updates
        const interval = setInterval(fetchCryptoData, 30000); // Update every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const renderItem = ({ item }: { item: CryptoItem }) => (
        <TouchableOpacity onPress={() => navigation.navigate('CryptoDetailScreen', { id: item.id })} style={styles.cryptoItem}>
            <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{item.market_cap_rank}</Text>
            </View>

            <Image source={{ uri: item.image }} style={styles.cryptoIcon} />

            <View style={styles.nameContainer}>
                <Text style={styles.symbolText}>{item.symbol.toUpperCase()}</Text>
                <Text style={styles.nameText}>{item.name}</Text>
            </View>

            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>
                    {formatCurrency(item.current_price)}
                </Text>
                <Text
                    style={[
                        styles.changeText,
                        { color: item.price_change_percentage_24h >= 0 ? '#4CAF50' : '#FF4444' },
                    ]}>
                    {item.price_change_percentage_24h.toFixed(2)}%
                </Text>
            </View>
        </TouchableOpacity>
    );

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={fetchCryptoData} style={styles.retryButton}>
                    <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <FlatList
            data={cryptoData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            refreshControl={
                <RefreshControl refreshing={loading} onRefresh={fetchCryptoData} />
            }
            ListHeaderComponent={() => (
                <View style={styles.header}>
                    <Text style={styles.headerText}>Cryptocurrency Prices</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    cryptoItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    rankContainer: {
        width: 30,
        marginRight: 10,
    },
    rankText: {
        color: '#666',
        fontSize: 14,
    },
    cryptoIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    nameContainer: {
        flex: 1,
    },
    symbolText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    nameText: {
        fontSize: 14,
        color: '#666',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    changeText: {
        fontSize: 14,
        marginTop: 4,
    },
    header: {
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 16,
        color: '#FF4444',
        marginBottom: 16,
    },
    retryButton: {
        padding: 12,
        backgroundColor: '#007AFF',
        borderRadius: 8,
    },
    retryText: {
        color: '#fff',
        fontSize: 16,
    },
});
