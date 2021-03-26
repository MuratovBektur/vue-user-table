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
          <th scope="col">
            <div class="v-table__thead-item">
              <span>firstName</span>
              <span class="v-table__caret-icons">
                <i
                  :class="[
                    'bi',
                    sortBy === 'firstName asc'
                      ? 'bi-caret-up-fill'
                      : 'bi-caret-up',
                  ]"
                  @click="sort('firstName asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'firstName desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('firstName desc')"
                ></i>
              </span>
            </div>
          </th>
          <th scope="col">
            <div class="v-table__thead-item">
              <span>lastName</span>
              <span class="v-table__caret-icons">
                <i
                  :class="[
                    'bi',
                    sortBy === 'lastName asc'
                      ? 'bi-caret-up-fill'
                      : 'bi-caret-up',
                  ]"
                  @click="sort('lastName asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'lastName desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('lastName desc')"
                ></i>
              </span>
            </div>
          </th>
          <th scope="col">
            <div class="v-table__thead-item">
              <span>email</span>
              <span class="v-table__caret-icons">
                <i
                  :class="[
                    'bi',
                    sortBy === 'email asc' ? 'bi-caret-up-fill' : 'bi-caret-up',
                  ]"
                  @click="sort('email asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'email desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('email desc')"
                ></i>
              </span>
            </div>
          </th>
          <th scope="col">
            <div class="v-table__thead-item">
              <span>phone</span>
              <span class="v-table__caret-icons">
                <i
                  :class="[
                    'bi',
                    sortBy === 'phone asc' ? 'bi-caret-up-fill' : 'bi-caret-up',
                  ]"
                  @click="sort('phone asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'phone desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('phone desc')"
                ></i>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id + user.firstName">
          <th scope="row">
            <!-- <span class="tooltiptext">Tooltip text</span> -->
            <!-- <div class="tooltip"> -->
            <!-- <span
              data-bs-toggle="tooltip"
              title=""
              data-bs-original-title="Default tooltip"
            > -->
            <div class="tooltip ">
              {{ user.id }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + user.lastName }}</b>
                <br />
                <br />

                Описание: {{ user.description }}

                <br />
                <br />

                Адрес проживания:
                <b>{{ user.address.streetAddress }}</b>
                <br />
                Город:
                <b>{{ user.address.city }}</b>
                <br />
                Провинция/штат:
                <b>{{ user.address.state }}</b>
                <br />
                Индекс:
                <b>{{ user.address.zip }}</b>
              </span>
            </div>

            <!-- </span> -->
            <!-- <span class="tooltiptext">Tooltip text</span> -->
            <!-- </div> -->
          </th>
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
    <!-- <a
      data-bs-toggle="tooltip"
      title=""
      data-bs-original-title="Default tooltip"
    >
      test
    </a> -->
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
    sortBy: String,
  },

  methods: {
    sort(props) {
      this.$emit("sort", props);
    },
  },
};
</script>

<style lang="scss">
.v-table {
  padding: 20px 0;
  // width: 920px;
  overflow: auto;

  &__loading-bar {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
  }
  &__thead-item {
    display: inline-flex;
    align-items: center;
  }

  &__thead-item > span:first-child {
    margin-right: 5px;
  }

  &__caret-icons {
    display: inline-flex;
    flex-direction: column;
  }

  &__caret-icons > i {
    cursor: pointer;
    font-size: 14px;
    height: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
