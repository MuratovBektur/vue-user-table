<template>
  <div class="container">
    <div id="app" v-if="!error">
      <div v-if="selectedDB">
        <vHeader @on-search="onSearch" />
        <div class="d-flex justify-content-center mt-5">
          <button class="btn btn-primary" @click="showForm = !showForm">
            {{ showForm ? "Убрать" : "Добавить" }}
          </button>
        </div>
        <vAddUserForm v-if="showForm" @add-user="addUser" />
        <vTable :users="filteredUsers" :sortBy="sortBy" @sort="sort" />
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
      </div>
      <div
        class="h-100 d-flex flex-column justify-content-center align-items-center"
        v-else
      >
        <button class="btn btn-primary " @click="selectedDB = 'small'">
          Маленький список
        </button>
        <button class="btn btn-primary mt-3" @click="selectedDB = 'big'">
          Большой список
        </button>
      </div>
    </div>
    <div class="h-100 d-flex justify-content-center align-items-center" v-else>
      <img src="./assets/img/error.svg" alt="error" />
      <h1 align="center" class="mt-5">
        Error
      </h1>
    </div>
    <div v-show="showNotification" class="my-notification">
      <i
        class="bi bi-check2-circle me-3"
        style="color:green; font-size:30px"
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
      await this.sleep(2000);
      if (this.selectedDB === "small") this.users = smallDB;
      else if (this.selectedDB === "big") this.users = bigDB;
      if (this.selectedDB) this.isLoaded = true;
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
      console.log(this.currentPage);
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
      console.log("userlist", userList);
      // switch (this.sortBy) {
      //   case "id asc":
      //     userList = this.users.safeSortByObjParam("id");
      //     break;
      //   case "id desc":
      //     userList = this.users.safeSortByObjParam("id", "desc");
      //     break;
      //   case "firstName asc":
      //     userList = this.users.safeSortByObjParam("firstName");
      //     break;
      //   case "firstName desc":
      //     userList = this.users.safeSortByObjParam("firstName", "desc");
      //     break;
      //   case "lastName asc":
      //     userList = this.users.safeSortByObjParam("lastName");
      //     break;
      //   case "lastName desc":
      //     userList = this.users.safeSortByObjParam("lastName", "desc");
      //     break;
      //   // case "id asc":
      //   //   userList = this.users.safeSortByObjParam("id");
      //   //   break;
      //   // case "id desc":
      //   //   userList = this.users.safeSortByObjParam("id", "desc");
      //   //   break;
      //   default:
      //     userList = this.users;
      //     break;
      // }
      if (this.filterBy != null && this.filterBy !== "") {
        userList = this.userList.filter((user) => {
          if (user?.firstName.toLowerCase().includes(this.filterBy))
            return false;
        });
      }
      if (this.sortBy) {
        let params = this.sortBy.split(" ");
        userList = this.userList.safeSortByObjParam(params[0], params[1]);
      } else userList = this.users;
      return userList?.slice(
        this.usersPerPage * (this.currentPage - 1),
        this.usersPerPage * this.currentPage
      );
    },
    pageCount() {
      if (this.users) {
        return Math.ceil(this.users.length / this.usersPerPage);
      } else return 1;
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
</style>
