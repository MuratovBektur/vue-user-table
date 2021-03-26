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
            <div class="tooltip" @mouseenter="changePositionToLeft">
              {{ user.id }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
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
          </th>
          <td>
            <div class="tooltip" @mouseenter="changePositionToLeft">
              {{ user.firstName }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
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
          </td>
          <td>
            <div class="tooltip" @mouseenter="changePositionToCenter">
              {{ user.lastName }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
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
          </td>
          <td>
            <div class="tooltip" @mouseenter="changePositionToRight">
              {{ user.email }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
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
          </td>
          <td>
            <div class="tooltip" @mouseenter="changePositionToRight">
              {{ user.phone }}
              <span class="tooltiptext">
                Выбран пользователь
                <b>{{ user.firstName + " " + user.lastName }}</b>
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
  padding: 20px 0;
  // width: 920px;
  overflow-x: auto;
  overflow-y: hidden;

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
