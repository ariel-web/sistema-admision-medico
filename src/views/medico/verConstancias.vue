<template>
    <div>
      <Card title="Constancias Impresas" noborder>
        <div class="-mx-6">
          <vue-good-table
            :columns="columns"
            styleClass=" vgt-table centered  lesspadding2 table-head "
            :rows="constancias"
            :pagination-options="{
              enabled: true,
              perPage: perpage,
            }"
            :sort-options="{
              enabled: false,
            }"
            :select-options="{
              enabled: true,
              selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
              selectioninfoClass: 'custom-class',
              selectionText: 'Constancia seleccionado',
              clearSelectionText: 'Limpiar',
              disableSelectinfo: true, // disable the select info-500 panel on top
              selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
            }"
          >
            <template v-slot:table-row="props">
              <span v-if="props.column.field == 'codigo'">
                {{ "#" + props.row.codigo }}
              </span>
              <span v-if="props.column.field == 'p_dni'">
                <div style="text-align: left;">
                  <span> {{ props.row.p_dni }} </span>
                  <div>
                    {{ props.row.p_nombres }} {{ props.row.p_paterno }} {{ props.row.p_materno }}
                  </div>
                </div>
              </span>
              <span
                v-if="props.column.field == 'date'"
                class="text-slate-500 dark:text-slate-300"
              >
                {{ props.row.date }}
              </span>
              <span v-if="props.column.field == 'status'" class="block w-full">
                <span
                  class="inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25"
                  :class="`${
                    props.row.status === 'paid'
                      ? 'text-success-500 bg-success-500'
                      : ''
                  } 
              ${
                props.row.status === 'due'
                  ? 'text-warning-500 bg-warning-500'
                  : ''
              }
              ${
                props.row.status === 'cancled'
                  ? 'text-danger-500 bg-danger-500'
                  : ''
              }
              
               `"
                >
                  {{ props.row.status }}
                </span>
              </span>
              <span v-if="props.column.field == 'action'">
                <div class="flex space-x-2 rtl:space-x-reverse" style="justify-content: center;">
                  <Tooltip placement="top" arrow theme="dark">
                    <template #button>
                      <div class="action-btn">
                        <Icon icon="heroicons:eye" />
                      </div>
                    </template>
                    <span> View</span>
                  </Tooltip>
                  <Tooltip placement="top" arrow theme="dark">
                    <template #button>
                      <div class="action-btn">
                        <Icon icon="heroicons:pencil-square" />
                      </div>
                    </template>
                    <span> Edit</span>
                  </Tooltip>
                  <Tooltip placement="top" arrow theme="danger-500">
                    <template #button>
                      <div class="action-btn">
                        <Icon icon="heroicons:trash" />
                      </div>
                    </template>
                    <span>Delete</span>
                  </Tooltip>
                </div>
              </span>
            </template>
            <template #pagination-bottom="props">
              <div class="py-4 px-3 flex justify-center">
                <Pagination
                  :total="50"
                  :current="current"
                  :per-page="perpage"
                  :pageRange="pageRange"
                  @page-changed="current = $event"
                  :pageChanged="props.pageChanged"
                  :perPageChanged="props.perPageChanged"
                >
                  >
                </Pagination>
              </div>
            </template>
          </vue-good-table>
        </div>
      </Card>
    </div>
  </template>
  <script>
  import Card from "@/components/Card";
  import Icon from "@/components/Icon";
  import Tooltip from "@/components/Tooltip";
  import Pagination from "@/components/Pagination";
  // import { advancedTable } from "@/constant/basic-tablle-data";
  import axios from 'axios';

  export default {
    components: {
      Pagination,
      Icon,
      Tooltip,
      Card,
    },
  
    data() {
      return {
        constancias:[],
        // advancedTable,
        current: 1,
        perpage: 10,
        pageRange: 5,
        searchTerm: "",

        columns: [
          {
            label: "Constancia",
            field: "codigo",

          },
          {
            label: "Postulante",
            field: "p_dni",
            align: "left"
          },
          {
            label: "Nombres",
            field: "p_nombres",
          },
          {
            label: "Ap. Paterno",
            field: "p_paterno",
          },
          {
            label: "Ap. Materno",
            field: "p_paterno",
          },
          // {
          //   label: "Fecha",
          //   field: "date",
          // },
   
          // {
          //   label: "Estado",
          //   field: "status",
          // },
          {
            label: "Action",
            field: "action",
          },
        ],
      };
    },

    methods:{
      async getConstancias(){
        let res = await axios.post('https://plankton-app-848ak.ondigitalocean.app/api/get-constancias-medicas');
        this.constancias = res.data.datos.data;
      },
    },

    mounted() {
      this.getConstancias(); 
    },

  };
  </script>
  <style lang="scss" scoped>
  .action-btn {
    @apply h-6 w-6 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 rounded;
  }
  </style>