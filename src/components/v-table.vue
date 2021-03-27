<template>
  <div class="v-table mt-5">
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
                    sortBy === 'id_asc' ? 'bi-caret-up-fill' : 'bi-caret-up',
                  ]"
                  @click="sort('id_asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'id_desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('id_desc')"
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
                    sortBy === 'firstName_asc'
                      ? 'bi-caret-up-fill'
                      : 'bi-caret-up',
                  ]"
                  @click="sort('firstName_asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'firstName_desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('firstName_desc')"
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
                    sortBy === 'lastName_asc'
                      ? 'bi-caret-up-fill'
                      : 'bi-caret-up',
                  ]"
                  @click="sort('lastName_asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'lastName_desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('lastName_desc')"
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
                    sortBy === 'email_asc' ? 'bi-caret-up-fill' : 'bi-caret-up',
                  ]"
                  @click="sort('email_asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'email_desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('email_desc')"
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
                    sortBy === 'phone_asc' ? 'bi-caret-up-fill' : 'bi-caret-up',
                  ]"
                  @click="sort('phone_asc')"
                ></i>
                <i
                  :class="[
                    'bi',
                    sortBy === 'phone_desc'
                      ? 'bi-caret-down-fill'
                      : 'bi-caret-down',
                  ]"
                  @click="sort('phone_desc')"
                ></i>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id + user.firstName">
          <th scope="row">
            <div class="tooltip" @mouseenter="changePositionToLeft">
              {{ user.id }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
                <br />
                <br />

                <template v-if="user.description">
                  Описание: {{ user.description }}

                  <br />
                  <br />
                </template>
                <template v-if="user.address">
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
                </template>
              </span>
            </div>
          </th>
          <td>
            <div class="tooltip" @mouseenter="changePositionToLeft">
              {{ user.firstName }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
                <br />
                <br />
                <template v-if="user.description">
                  Описание: {{ user.description }}

                  <br />
                  <br />
                </template>
                <template v-if="user.address">
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
                </template>
              </span>
            </div>
          </td>
          <td>
            <div class="tooltip" @mouseenter="changePositionToCenter">
              {{ user.lastName }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
                <br />
                <br />
                <template v-if="user.description">
                  Описание: {{ user.description }}

                  <br />
                  <br />
                </template>
                <template v-if="user.address">
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
                </template>
              </span>
            </div>
          </td>
          <td>
            <div class="tooltip" @mouseenter="changePositionToRight">
              {{ user.email }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
                <br />
                <br />
                <template v-if="user.description">
                  Описание: {{ user.description }}

                  <br />
                  <br />
                </template>
                <template v-if="user.address">
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
                </template>
              </span>
            </div>
          </td>
          <td>
            <div class="tooltip" @mouseenter="changePositionToRight">
              {{ user.phone }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
                <br />
                <br />
                <template v-if="user.description">
                  Описание: {{ user.description }}

                  <br />
                  <br />
                </template>
                <template v-if="user.address">
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
                </template>
              </span>
            </div>
          </td>
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
    },
    sortBy: String,
  },

  methods: {
    sort(props) {
      this.$emit("sort", props);
    },
    changePositionToRight() {
      let root = document.documentElement;
      root.style.setProperty("--tooltip-left-position", "auto");
      root.style.setProperty("--tooltip-right-position", "50%");
      root.style.setProperty("--tooltip-left-after-position", "auto");
      root.style.setProperty("--tooltip-right-after-position", "15px");
    },
    changePositionToLeft() {
      let root = document.documentElement;
      root.style.setProperty("--tooltip-left-position", "50%");
      root.style.setProperty("--tooltip-right-position", "auto");
      root.style.setProperty("--tooltip-left-after-position", "15px");
      root.style.setProperty("--tooltip-right-after-position", "auto");
    },
    changePositionToCenter() {
      let root = document.documentElement;
      root.style.setProperty("--tooltip-left-position", "50%");
      root.style.setProperty("--tooltip-right-position", "auto");
      root.style.setProperty("--tooltip-left-after-position", "15px");
      root.style.setProperty("--tooltip-right-after-position", "auto");
    },
  },
};
</script>

<style lang="scss">
.v-table {
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Edge, Opera and Firefox */
  }
}
@media screen and (max-width: 768px) {
  .v-table {
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>
