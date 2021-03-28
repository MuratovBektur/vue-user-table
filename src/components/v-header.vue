<template>
  <header>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand noselect" @click="$emit('show-all-user')"
          >User Table</a
        >
        <div class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchInput"
            @keyup.enter="onSearch"
          />
          <button @click="onSearch" class="btn btn-outline-light" type="submit">
            Найти
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
    };
  },
  methods: {
    onSearch() {
      if (this.searchInput != null && this.searchInput !== "") {
        this.$emit("on-search", this.searchInput);
        this.searchInput = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  & .navbar-brand {
    cursor: pointer;
  }
}
</style>
