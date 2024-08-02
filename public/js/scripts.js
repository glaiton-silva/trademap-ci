new Vue({
    el: '#app',
    data: {
        phones: [], // Lista de telefones carregados do servidor
        showModal: false, // Controle de exibição do modal
        currentPhone: {}, // Telefone atualmente sendo adicionado ou editado
        isEditing: false, // Flag para determinar se estamos no modo de edição
        modalTitle: "Edit Phone Data" // Título do modal
    },
    created() {
        this.fetchData(); // Carrega os dados dos telefones ao criar a instância Vue
        window.addEventListener('resize', this.createChart); // Atualiza o gráfico ao redimensionar a janela
    },
    methods: {
        /**
         * Carrega os dados dos telefones do servidor.
         */
        fetchData() {
            axios.get('/phone')
                .then(response => {
                    this.phones = response.data;
                    this.calculateSalesPercentage();
                    this.createChart();
                })
                .catch(error => {
                    console.error("There was an error fetching the data:", error);
                });
        },

        /**
         * Calcula a porcentagem de vendas de cada telefone com base nas vendas totais.
         */
        calculateSalesPercentage() {
            const totalSales = this.phones.reduce((sum, phone) => sum + parseFloat(phone.sales), 0);
            this.phones.forEach(phone => {
                if (totalSales > 0) {
                    phone.salesPercentage = ((parseFloat(phone.sales) / totalSales) * 100).toFixed(2);
                } else {
                    phone.salesPercentage = 0;
                }
            });
        },

        /**
         * Cria e renderiza o gráfico de árvore (treemap) dos telefones.
         */
        createChart() {
            if (!this.phones.length) return;

            const chartElement = document.querySelector('.chart');
            const width = chartElement.offsetWidth;
            const height = chartElement.offsetHeight;

            d3.select(chartElement).selectAll('*').remove(); // Limpa o gráfico existente

            const root = d3.hierarchy({ children: this.phones })
                .sum(d => d.sales)
                .sort((a, b) => b.sales - a.sales);

            const treemap = d3.treemap()
                .size([width, height])
                .padding(1);

            treemap(root);

            const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
                .domain([-10, 10]);

            d3.select('.chart')
                .selectAll('.node')
                .data(root.leaves())
                .enter().append('div')
                .attr('class', 'node')
                .style('left', d => d.x0 + 'px')
                .style('top', d => d.y0 + 'px')
                .style('width', d => d.x1 - d.x0 + 'px')
                .style('height', d => d.y1 - d.y0 + 'px')
                .style('background', d => colorScale(d.data.growth))
                .style('font-size', d => Math.max(10, (d.x1 - d.x0) / 5) + 'px')
                .text(d => `${d.data.growth}%`)
                .on('mouseover', function(event, d) {
                    const tooltip = document.getElementById('tooltip');
                    const growthText = d.data.growth > 0 ? 'Aumentou' : 'Diminuiu';
                    tooltip.innerHTML = `${d.data.name}<br>Porcentagem: ${d.data.salesPercentage}%<br>${growthText}: ${d.data.growth}%`;
                    tooltip.style.opacity = 1;
                })
                .on('mousemove', function(event) {
                    const tooltip = document.getElementById('tooltip');
                    tooltip.style.left = event.pageX - tooltip.offsetWidth / 2 + 'px';
                    tooltip.style.top = event.pageY - tooltip.offsetHeight - 25 + 'px'; // Ajustado para a posição do ponteiro
                })
                .on('mouseout', function() {
                    const tooltip = document.getElementById('tooltip');
                    tooltip.style.opacity = 0;
                })
                .on('click', (event, d) => {
                    this.openEditModal(d.data);
                });
        },

        /**
         * Abre o modal para adicionar um novo telefone.
         */
        openAddModal() {
            this.modalTitle = "Add Phone Data";
            this.currentPhone = { name: '', sales: 0, growth: 0 };
            this.showModal = true;
            this.isEditing = false;
        },

        /**
         * Abre o modal para editar os dados de um telefone existente.
         *
         * @param {Object} phone - Dados do telefone a ser editado.
         */
        openEditModal(phone) {
            this.modalTitle = "Edit Phone Data";
            this.currentPhone = Object.assign({}, phone);
            this.showModal = true;
            this.isEditing = true;
        },

        /**
         * Fecha o modal.
         */
        closeModal() {
            this.showModal = false;
            this.currentPhone = {};
        },

        /**
         * Salva os dados do telefone (adiciona ou atualiza).
         */
        saveData() {
            if (this.isEditing) {
                axios.post(`/updatePhone/${this.currentPhone.id}`, this.currentPhone)
                    .then(response => {
                        this.fetchData();
                        this.closeModal();
                    })
                    .catch(error => {
                        console.error("There was an error updating the data:", error);
                    });
            } else {
                axios.post('/addPhone', this.currentPhone)
                    .then(response => {
                        this.fetchData();
                        this.closeModal();
                    })
                    .catch(error => {
                        console.error("There was an error adding the data:", error);
                    });
            }
        },

        /**
         * Deleta um telefone existente.
         */
        deleteData() {
            axios.delete(`/deletePhone/${this.currentPhone.id}`)
                .then(response => {
                    this.fetchData();
                    this.closeModal();
                })
                .catch(error => {
                    console.error("There was an error deleting the data:", error);
                });
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.createChart);
    }
});
