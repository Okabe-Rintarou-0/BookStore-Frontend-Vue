<template>
    <BasicLayout>
        <Card :style="{ margin: '20px' }">
            <div id="swagger-ui"> </div>
        </Card>
    </BasicLayout>
</template>

<script>
import SwaggerUIBundle from 'swagger-ui'
import BasicLayout from '@/components/BasicLayout.vue'
import { API_DOCS_URL } from '../service/common'
import 'swagger-ui/dist/swagger-ui.css'
import { Card } from 'ant-design-vue'

export default {
    components: {
        BasicLayout,
        Card
    },
    mounted() {
        SwaggerUIBundle({
            url: API_DOCS_URL,
            dom_id: '#swagger-ui',
            presets: [
                SwaggerUIBundle.presets.apis,
            ],
        })
    }
}
</script>