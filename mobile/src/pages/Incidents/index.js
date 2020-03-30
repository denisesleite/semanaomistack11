import React, { useState, useEffect } from 'react';

import { Feather } from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';
//flat list pra fazer as listagens
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; //importa view como nao tem a div dentro do react native

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incident() {
    //começa com array vazio pq depois vai preencher
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //nao existe pagina 0
    const [loading, setLoading] = useState(false); //carrega uma pagina por vez
    
    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); //exatamente o mesmo nome la no routes.js no name
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length == total ){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        //onde estao os dados que vem da api
        setIncidents([... incidents, ... response.data ]); //copia todos os valores que vem do response.data
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>            
       
            <FlatList data={incidents} 
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} //quando o usuario chega no final da lista a função é disparada
                //troca o nome de item por incident
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { 
                                style: 'currency', currency: 'BRL' }).format(incident.value)}
                        </Text>

                        {/* passar função e não o valor de uma função por isso arrow function */}
                        <TouchableOpacity style={styles.detailsButton}
                        onPress={() => navigateToDetail(incident)}> 
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )} />
        </View>
    );
}