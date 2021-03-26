<template>
  <div class="container">
    <div id="app">
      <vHeader />
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
  </div>
</template>

<script>
import axios from "axios";
import { vHeader, vTable, vTablePagination } from "./components";

import "./util/safeSort";
export default {
  name: "App",
  data() {
    return {
      isLoaded: false,
      users: null,
      sortBy: null,
      currentPage: 1,
      usersPerPage: 20,
    };
  },
  components: {
    vHeader,
    vTable,
    vTablePagination,
  },
  async mounted() {
    try {
      // const url =
      //   "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
      const url =
        "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
      const res = await axios(url);
      this.users = res.data;
      this.isLoaded = true;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
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
  },
  computed: {
    filteredUsers() {
      let userList = null;
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
      if (this.sortBy) {
        let params = this.sortBy.split(" ");
        userList = this.users.safeSortByObjParam(params[0], params[1]);
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
}
#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
