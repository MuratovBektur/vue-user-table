<template>
  <div class="container px-0">
    <div id="app" v-if="!error">
      <div v-if="selectedDB">
        <vHeader @on-search="onSearch" />
        <div v-if="isLoaded" class="d-flex justify-content-center mt-5">
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
      <!-- <div class="my-notification"> -->
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
      console.log(location.search);
      location.search
        .substr(1)
        .split("&")
        .forEach((item) => {
          console.log(item);
          this.$set(this.queryParams, item.split("=")[0], item.split("=")[1]);
          // this.queryParams[] = ;
        });
      // console.log(this.queryParams);
      Object.entries(this.queryParams).forEach(([key, value]) => {
        // if (key === "currentPage") {
        //   this[key] = +value;
        //   console.log("ttt", key, value);
        // } else
        this[key] = value;

        console.log(key, value);
      });
      await this.sleep(2000);

      if (this.selectedDB === "small") this.users = smallDB;
      else if (this.selectedDB === "big") this.users = bigDB;
      if (this.selectedDB) {
        console.log(this.selectedDB, this.users);
        this.isLoaded = true;
      }
      this.url = new URL(window.location.href);
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
      console.log("this.filterBy", this.filterBy);
      console.log("userlist", userList);
      if (!userList) return;
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
        userList = userList.filter((user) => {
          if (
            user?.firstName.toLowerCase().includes(this.filterBy.toLowerCase())
          ) {
            return true;
          }
          return false;
        });
        console.log("filter", userList);
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
        console.log(this.selectedDB, smallDB);
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

    usersPerPage() {
      if (this.afterMount) this.currentPage = 1;
      this.url?.searchParams.set("usersPerPage", this.usersPerPage);
      window.history.replaceState(null, null, this.url);
    },
    sortBy() {
      if (this.afterMount) this.currentPage = 1;
      this.url?.searchParams.set("sortBy", this.sortBy);
      window.history.replaceState(null, null, this.url);
    },
    filterBy() {
      if (this.afterMount) this.currentPage = 1;
      this.url?.searchParams.set("filterBy", this.filterBy);
      window.history.replaceState(null, null, this.url);
    },
    currentPage() {
      this.url?.searchParams.set("currentPage", this.currentPage);
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
</style>
