new Vue({
    el: '#app', // Monta a instância Vue na div com id 'app'
    data: {
        phones: [], // Lista de telefones carregados do servidor
        showModal: false, // Controle de exibição do modal
        currentPhone: {}, // Telefone atualmente sendo adicionado ou editado
        isEditing: false, // Flag para determinar se estamos no modo de edição
        modalTitle: "Editar Dados do Telefone", // Título do modal
        sortKey: '', // A chave atual de ordenação (ex: 'sales', 'growth')
        sortOrder: 1 // Ordem de ordenação: 1 para crescente, -1 para decrescente
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
            axios.get('/phone') // Requisita os dados da API na rota '/phone'
                .then(response => {
                    this.phones = response.data; // Armazena os dados na lista 'phones'
                    this.calculateSalesPercentage(); // Calcula a porcentagem de vendas para cada telefone
                    this.createChart(); // Cria o gráfico com os dados recebidos
                })
                .catch(error => {
                    console.error("Houve um erro ao buscar os dados:", error); // Exibe um erro no console se a requisição falhar
                });
        },

        /**
         * Calcula a porcentagem de vendas de cada telefone com base nas vendas totais.
         */
        calculateSalesPercentage() {
            const totalSales = this.phones.reduce((sum, phone) => sum + parseFloat(phone.sales), 0); // Soma as vendas de todos os telefones
            this.phones.forEach(phone => { // Para cada telefone na lista
                if (totalSales > 0) {
                    phone.salesPercentage = ((parseFloat(phone.sales) / totalSales) * 100).toFixed(2); // Calcula a porcentagem de vendas
                } else {
                    phone.salesPercentage = 0; // Se não houver vendas totais, define a porcentagem como 0
                }
            });
        },

        /**
         * Cria e renderiza o gráfico de árvore (treemap) dos telefones.
         */
        createChart() {
            if (!this.phones.length) return; // Se não houver dados, não cria o gráfico

            const chartElement = document.querySelector('.chart'); // Seleciona o elemento HTML onde o gráfico será renderizado
            const width = chartElement.offsetWidth; // Define a largura do gráfico com base na largura do elemento
            const height = chartElement.offsetHeight; // Define a altura do gráfico com base na altura do elemento

            d3.select(chartElement).selectAll('*').remove(); // Limpa qualquer gráfico existente antes de criar um novo

            const root = d3.hierarchy({ children: this.phones }) // Cria uma hierarquia de dados para o treemap
                .sum(d => d.sales) // Define que o tamanho de cada nó será baseado nas vendas
                .sort((a, b) => b.sales - a.sales); // Ordena os nós por vendas de forma decrescente

            const treemap = d3.treemap() // Cria o layout do treemap
                .size([width, height]) // Define o tamanho do treemap com base nas dimensões do elemento
                .padding(1); // Adiciona um espaçamento entre os nós

            treemap(root); // Aplica o layout do treemap na hierarquia de dados

            const colorScale = d3.scaleSequential(d3.interpolateRdYlBu) // Cria uma escala de cores sequencial
                .domain([-10, 10]); // Define o domínio da escala de cores com base no crescimento (growth)

            d3.select('.chart')
                .selectAll('.node') // Seleciona todos os nós (divs) dentro do elemento gráfico
                .data(root.leaves()) // Liga os dados das folhas da hierarquia aos nós
                .enter().append('div') // Adiciona novos nós (divs) conforme necessário
                .attr('class', 'node') // Define a classe CSS dos nós
                .style('left', d => d.x0 + 'px') // Define a posição à esquerda do nó
                .style('top', d => d.y0 + 'px') // Define a posição superior do nó
                .style('width', d => d.x1 - d.x0 + 'px') // Define a largura do nó
                .style('height', d => d.y1 - d.y0 + 'px') // Define a altura do nó
                .style('background', d => colorScale(d.data.growth)) // Define a cor de fundo do nó com base no crescimento
                .style('font-size', d => Math.max(10, (d.x1 - d.x0) / 5) + 'px') // Define o tamanho da fonte com base na largura do nó
                .text(d => `${d.data.growth}%`) // Define o texto exibido no nó (percentual de crescimento)
                .on('mouseover', function(event, d) { // Evento de passar o mouse sobre um nó
                    const tooltip = document.getElementById('tooltip'); // Seleciona o elemento tooltip
                    const growthText = d.data.growth > 0 ? 'Aumentou' : 'Diminuiu'; // Define o texto baseado no crescimento
                    tooltip.innerHTML = `${d.data.name}<br>Porcentagem: ${d.data.salesPercentage}%<br>${growthText}: ${d.data.growth}%`; // Define o conteúdo do tooltip
                    tooltip.style.opacity = 1; // Torna o tooltip visível
                })
                .on('mousemove', function(event) { // Evento de movimentar o mouse sobre um nó
                    const tooltip = document.getElementById('tooltip'); // Seleciona o tooltip
                    tooltip.style.left = event.pageX - tooltip.offsetWidth / 2 + 'px'; // Posiciona o tooltip horizontalmente
                    tooltip.style.top = event.pageY - tooltip.offsetHeight - 25 + 'px'; // Posiciona o tooltip verticalmente
                })
                .on('mouseout', function() { // Evento de retirar o mouse de cima do nó
                    const tooltip = document.getElementById('tooltip'); // Seleciona o tooltip
                    tooltip.style.opacity = 0; // Esconde o tooltip
                })
                .on('click', (event, d) => { // Evento de clicar em um nó
                    this.openEditModal(d.data); // Abre o modal de edição para o telefone correspondente
                });
        },

        /**
         * Abre o modal para adicionar um novo telefone.
         */
        openAddModal() {
            this.modalTitle = "Adicionar Dados do Telefone"; // Define o título do modal para "Adicionar"
            this.currentPhone = { name: '', sales: 0, growth: 0 }; // Inicializa o telefone atual com valores padrão
            this.showModal = true; // Exibe o modal
            this.isEditing = false; // Define que não estamos no modo de edição
        },

        /**
         * Abre o modal para editar os dados de um telefone existente.
         *
         * @param {Object} phone - Dados do telefone a ser editado.
         */
        openEditModal(phone) {
            this.modalTitle = "Editar Dados do Telefone"; // Define o título do modal para "Editar"
            this.currentPhone = Object.assign({}, phone); // Copia os dados do telefone para evitar alterações acidentais no objeto original
            this.showModal = true; // Exibe o modal
            this.isEditing = true; // Define que estamos no modo de edição
        },

        /**
         * Fecha o modal.
         */
        closeModal() {
            this.showModal = false; // Esconde o modal
            this.currentPhone = {}; // Limpa os dados do telefone atual
        },

        /**
         * Salva os dados do telefone (adiciona ou atualiza).
         */
        saveData() {
            if (this.isEditing) { // Se estivermos no modo de edição
                axios.post(`/updatePhone/${this.currentPhone.id}`, this.currentPhone) // Envia uma requisição POST para atualizar o telefone
                    .then(response => {
                        this.fetchData(); // Recarrega os dados dos telefones
                        this.closeModal(); // Fecha o modal
                    })
                    .catch(error => {
                        console.error("Houve um erro ao atualizar os dados:", error); // Exibe um erro no console se a requisição falhar
                    });
            } else { // Se estivermos adicionando um novo telefone
                axios.post('/addPhone', this.currentPhone) // Envia uma requisição POST para adicionar um novo telefone
                    .then(response => {
                        this.fetchData(); // Recarrega os dados dos telefones
                        this.closeModal(); // Fecha o modal
                    })
                    .catch(error => {
                        console.error("Houve um erro ao adicionar os dados:", error); // Exibe um erro no console se a requisição falhar
                    });
            }
        },

        /**
         * Deleta um telefone existente.
         */
        deleteData() {
            axios.delete(`/deletePhone/${this.currentPhone.id}`) // Envia uma requisição DELETE para excluir o telefone
                .then(response => {
                    this.fetchData(); // Recarrega os dados dos telefones
                    this.closeModal(); // Fecha o modal
                })
                .catch(error => {
                    console.error("Houve um erro ao deletar os dados:", error); // Exibe um erro no console se a requisição falhar
                });
        },

        /**
         * Ordena os dados de acordo com a chave especificada (sales ou growth).
         *
         * @param {string} key - A chave para ordenar os dados (sales ou growth).
         */
        sortData(key) {
            if (this.sortKey === key) { // Se a chave de ordenação for a mesma que a atual
                this.sortOrder *= -1; // Alterna entre crescente e decrescente
            } else {
                this.sortKey = key; // Define a nova chave de ordenação
                this.sortOrder = 1; // Inicialmente, a ordenação é crescente
            }
            this.phones.sort((a, b) => (a[key] - b[key]) * this.sortOrder); // Ordena a lista de telefones com base na chave e na ordem
            this.createChart(); // Atualiza o gráfico com a nova ordenação
        }
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.createChart); // Remove o ouvinte de redimensionamento da janela ao destruir a instância Vue
    }
});
