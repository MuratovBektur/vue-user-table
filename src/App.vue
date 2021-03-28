<template>
  <div class="container px-0">
    <div id="app" v-if="!error">
      <div v-if="selectedDB">
        <template v-if="isLoaded">
          <vHeader @on-search="onSearch" @show-all-user="filterBy = ''" />
          <template v-if="slicedUsers && slicedUsers.length">
            <div class="d-flex justify-content-center mt-5">
              <button class="btn btn-primary" @click="showForm = !showForm">
                {{ showForm ? "Убрать" : "Добавить" }}
              </button>
            </div>
            <vAddUserForm v-if="showForm" @add-user="addUser" />
            <vTable :users="slicedUsers" :sortBy="sortBy" @sort="sort" />
            <vTablePagination
              v-if="isLoaded"
              :currentPage="currentPage"
              :pageCount="pageCount"
              :usersPerPage="usersPerPage"
              @set-user-count="setUserCount"
              @set-current-page="setCurrentPage"
              @set-next-page="setNextPage"
              @set-prev-page="setPrevPage"
            />
          </template>
          <div
            v-else
            class="not-found-section d-flex flex-column justify-content-center align-items-center"
          >
            <!-- <div  class="d-flex flex-column justify-content-center align-items-center"> -->
            <img src="./assets/img/no-data.png" alt="no user data" />
            <h2 align="center" class="mt-3">Пользователей не найдено</h2>
            <button class="btn btn-primary mt-3" @click="filterBy = ''">
              Вернуться на главную
            </button>
            <!-- </div> -->
          </div>
        </template>
        <div v-else class="loading-bar d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div
        class="h-100 d-flex flex-column justify-content-center align-items-center"
        v-else
      >
        <button class="btn btn-primary" @click="selectedDB = 'small'">
          Маленький список
        </button>
        <button class="btn btn-primary mt-3" @click="selectedDB = 'big'">
          Большой список
        </button>
      </div>
    </div>
    <div
      class="h-100 d-flex flex-column justify-content-center align-items-center"
      v-else
    >
      <img src="./assets/img/error.png" alt="error" />
      <h1 align="center" class="mt-5">Error {{ error && error.message }}</h1>
    </div>
    <div v-show="showNotification" class="my-notification">
      <!-- <div class="my-notification"> -->
      <i
        class="bi bi-check2-circle me-3"
        style="color: green; font-size: 30px"
      ></i>
      <span>Сохранено</span>
    </div>
  </div>
</template>

<script>
import AOS from "aos";
import "aos/dist/aos.css";

import { vHeader, vTable, vTablePagination, vAddUserForm } from "./components";
import "./util/safeSort";
import "./util/numberToLowerCase";
import { getAllParamsFromQueryParams } from "./util/queryParams";
import smallDB from "./db/small-db.json";
import bigDB from "./db/big-db.json";

export default {
  name: "App",
  data() {
    return {
      isLoaded: false,
      users: null,
      sortBy: null,
      filterBy: null,
      currentPage: 1,
      usersPerPage: 20,
      error: null,
      selectedDB: null,
      showForm: false,
      showNotification: false,
      url: null,
      queryParams: {},
      afterMount: false,
    };
  },
  components: {
    vHeader,
    vTable,
    vTablePagination,
    vAddUserForm,
  },
  created() {
    AOS.init();
  },
  async mounted() {
    try {
      const aviablesSortParams = [
        "id_asc",
        "id_desc",
        "firstName_asc",
        "firstName_desc",
        "lastName_asc",
        "lastName_desc",
        "email_asc",
        "email_desc",
        "phone_asc",
        "phone_desc",
      ];
      this.queryParams = getAllParamsFromQueryParams(location);
      Object.entries(this.queryParams).forEach(([key, value]) => {
        if (value != null || value === "") {
          if (key === "sortBy" && aviablesSortParams.includes(value)) {
            this[key] = value;
          } else if (key === "selectedDB" && ["big", "small"].includes(value)) {
            this[key] = value;
          } else if (key === "usersPerPage" && !isNaN(value)) {
            this[key] = value;
          } else if (key === "filterBy") this[key] = value;
        }
      });

      await this.sleep(2000);

      if (this.selectedDB === "small") this.users = smallDB;
      else if (this.selectedDB === "big") this.users = bigDB;
      if (this.selectedDB) {
        this.isLoaded = true;
      }
      this.url = new URL(window.location.href);

      if (
        !this.queryParams.currentPage ||
        isNaN(this.queryParams.currentPage) ||
        this.queryParams.currentPage > this.pageCount
      ) {
        this.currentPage = 1;
        this.url?.searchParams.set("currentPage", 1);
        window.history.replaceState(null, null, this.url);
      } else this.currentPage = this.queryParams.currentPage;

      this.afterMount = true;

      // const url =
      //   "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
      // // const url =
      // // "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
      // const res = await axios(url);
      // this.users = res.data;
      // this.isLoaded = true;
    } catch (e) {
      this.error = e;
      console.error(e);
    }
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    setCurrentPage(page) {
      this.currentPage = page;
    },
    setNextPage() {
      this.currentPage =
        this.currentPage != this.pageCount
          ? this.currentPage + 1
          : this.pageCount;
    },
    setPrevPage() {
      this.currentPage = this.currentPage != 1 ? this.currentPage - 1 : 1;
    },
    setUserCount(val) {
      this.usersPerPage = val;
    },
    sort(prop) {
      this.currentPage = 1;
      if (this.sortBy === prop) {
        this.sortBy = null;
      } else this.sortBy = prop;
    },
    addUser(user) {
      this.users.unshift(user);
      this.showForm = false;
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    },
    onSearch(val) {
      this.filterBy = val;
    },
  },
  computed: {
    filteredUsers() {
      let userList = this.users;
      if (!userList) return;
      // switch (this.sortBy) {
      //   case "id asc":
      //     userList = this.users.safeSortByObjParam("id");
      //     break;
      //   case "id desc":
      //     userList = this.users.safeSortByObjParam("id", "desc");
      //     break;
      //   default:
      //     userList = this.users;
      //     break;
      // }
      if (this.filterBy != null && this.filterBy !== "") {
        const userProps = ["id", "firstName", "lastName", "email", "phone"];
        userList = userList.filter((user) => {
          if (
            userProps.some((prop) => {
              return user[prop]
                .toLowerCase()
                .includes(this.filterBy.toLowerCase());
            })
          ) {
            return true;
          }
          return false;
        });
      }
      if (this.sortBy) {
        let params = this.sortBy.split("_");
        if (params[0] === "id") {
          userList = userList.safeSortByObjParam(params[0], params[1]);
        } else
          userList = userList.safeSortByObjParam(params[0], params[1], {
            ignoreCaseSensitive: true,
          });
      }
      return userList;
    },
    slicedUsers() {
      return this.filteredUsers?.slice(
        this.usersPerPage * (this.currentPage - 1),
        this.usersPerPage * this.currentPage
      );
    },
    pageCount() {
      if (this.filteredUsers) {
        return Math.ceil(this.filteredUsers.length / this.usersPerPage);
      } else return 1;
    },
  },
  watch: {
    async selectedDB() {
      try {
        await this.sleep(2000);
        if (this.selectedDB === "small") this.users = smallDB;
        else if (this.selectedDB === "big") this.users = bigDB;
        if (this.selectedDB) {
          this.url.searchParams.set("selectedDB", this.selectedDB);
          window.history.replaceState(null, null, this.url);
          this.isLoaded = true;
        }
        // const url =
        //   "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
        // // const url =
        // // "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
        // const res = await axios(url);
        // this.users = res.data;
        // this.isLoaded = true;
      } catch (e) {
        this.error = e;
        console.error(e);
      }
    },

    usersPerPage(val) {
      if (this.afterMount) this.currentPage = 1;
      this.url?.searchParams.set("usersPerPage", val);
      window.history.replaceState(null, null, this.url);
    },
    sortBy(val) {
      if (this.afterMount) this.currentPage = 1;
      this.url?.searchParams.set("sortBy", val);
      window.history.replaceState(null, null, this.url);
    },
    filterBy(val) {
      if (this.afterMount) this.currentPage = 1;
      this.url?.searchParams.set("filterBy", val);
      window.history.replaceState(null, null, this.url);
    },
    currentPage(val) {
      this.url?.searchParams.set("currentPage", val);
      window.history.replaceState(null, null, this.url);
    },
  },
};
</script>

<style>
body {
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;

  /* margin-top: 60px; */
}
.loading-bar {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
.not-found-section {
  min-height: calc(100vh - 56px);
}

@media screen and (max-width: 480px) {
  .not-found-section {
    min-height: calc(100vh - 94px);
  }
}
</style>
