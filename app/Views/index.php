<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trademap</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://d3js.org/d3.v6.min.js"></script>
</head>

<body>
    <div id="app">
        <button id="addModal" @click="openAddModal">Add Phone</button>
        <div class="chart"></div>
        <div id="tooltip" class="tooltip"></div>
        <div class="modal" v-if="showModal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ modalTitle }}</h2>
                <form @submit.prevent="saveData">
                    <label for="name">Name:</label>
                    <input type="text" v-model="currentPhone.name" id="name" required>
                    <label for="sales">Sales:</label>
                    <input type="number" v-model="currentPhone.sales" id="sales" required>
                    <label for="growth">Growth:</label>
                    <input type="number" v-model="currentPhone.growth" id="growth" required step="0.01">
                    <button type="submit">Save</button>
                    <button type="button" @click="deleteData" v-if="isEditing" class="delete">Delete</button>
                </form>
            </div>
        </div>
    </div>

    <script src="js/scripts.js"></script>
</body>

</html>
