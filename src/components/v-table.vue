<template>
  <div class="v-table">
    <table v-if="users" class="table  table-striped">
      <thead>
        <tr class="table-dark">
          <th scope="col">
            <div class="v-table__thead-item">
              <span>id</span>
              <span class="v-table__caret-icons">
                <i
                  :class="[
                    'bi',
                    sortBy === 'id asc' ? 'bi-caret-up-fill' : 'bi-caret-up',
                  ]"
                  @click="sort('id asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'id desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('id desc')"
                ></i>
              </span>
            </div>
          </th>
          <th scope="col">firstName</th>
          <th scope="col">lastName</th>
          <th scope="col">email</th>
          <th scope="col">phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id + user.firstName">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="v-table__loading-bar d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      // default: function() {
      //   return [
      //     {
      //       id: 331,
      //       firstName: "Yolunda",
      //       lastName: "Psarros",
      //       email: "PWing@nunc.net",
      //       phone: "(692)117-1280",
      //       address: {
      //         streetAddress: "8597 Porttitor Ct",
      //         city: "Spokane",
      //         state: "MO",
      //         zip: "26157",
      //       },
      //       description:
      //         "consequat nec sed nullam sollicitudin vestibulum sollicitudin porta ac augue convallis amet sed porta odio massa ac mi tellus amet pharetra pretium tincidunt quis molestie tortor sapien elementum vestibulum quis sollicitudin vestibulum",
      //     },
      //     {
      //       id: 842,
      //       firstName: "Paul",
      //       lastName: "Tarbox",
      //       email: "RWarren@tortor.io",
      //       phone: "(800)600-4117",
      //       address: {
      //         streetAddress: "8969 Lectus Ln",
      //         city: "Woodlawn",
      //         state: "IN",
      //         zip: "68024",
      //       },
      //       description:
      //         "odio porta eget sit ante augue magna sagittis placerat facilisis turpis nec egestas etiam at tortor dolor tortor vel turpis consectetur aliquam dolor suspendisse consectetur mattis nullam porta lacus turpis mi vestibulum",
      //     },
      //   ];
      // },
    },
  },
  data() {
    return {
      sortBy: null,
    };
  },
  methods: {
    sort(props) {
      this.$emit("sort-by", props);
      this.sortBy = props;
    },
  },
};
</script>

<style>
.v-table {
  padding: 20px 0;
}
.v-table__loading-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
.v-table__thead-item {
  display: inline-flex;
  align-items: center;
}

.v-table__thead-item > span:first-child {
  margin-right: 5px;
}

.v-table__caret-icons {
  display: inline-flex;
  flex-direction: column;
}

.v-table__caret-icons > i {
  cursor: pointer;
  font-size: 14px;
  height: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
