<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title>Ошибка 404</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            Запрашиваемая страница не найдена! Воспользуйтесь навигацией для перемещения в нужный раздел.
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        name: 'NotFound',
        metaInfo: {
            // if no subcomponents specify a metaInfo.title, this title will be used
            title: '404 error',
        },
    }
</script>