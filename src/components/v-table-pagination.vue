<template>
  <div class="v-table-pagination row">
    <nav class="col-12 col-md-6" aria-label="Page navigation example">
      <ul
        class="pagination justify-content-center justify-content-md-start justify-content-lg-end"
      >
        <li class="page-item" @click="$emit('set-prev-page')">
          <a class="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <template v-if="pageCount < 6">
          <li
            v-for="page of pageCount"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <a class="page-link" @click="$emit('set-current-page', page)">{{
              page
            }}</a>
          </li>
        </template>
        <template v-else>
          <template v-if="currentPage === 1">
            <li class="page-item active">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage)"
                >{{ currentPage }}</a
              >
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage + 1)"
                >{{ currentPage + 1 }}</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage + 2)"
                >{{ currentPage + 2 }}</a
              >
            </li>

            <li class="page-item">
              <a class="page-link disabled">...</a>
            </li>

            <li class="page-item">
              <a
                class="page-link"
                @click="$emit('set-current-page', pageCount)"
                >{{ pageCount }}</a
              >
            </li>
          </template>
          <template v-else-if="currentPage === 2">
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage - 1)"
                >{{ currentPage - 1 }}</a
              >
            </li>
            <li class="page-item active">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage)"
                >{{ currentPage }}</a
              >
            </li>
            <li class="page-item">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage + 1)"
                >{{ currentPage + 1 }}</a
              >
            </li>
            <li class="page-item">
              <a class="page-link disabled">...</a>
            </li>

            <li class="page-item">
              <a
                class="page-link"
                @click="$emit('set-current-page', pageCount)"
                >{{ pageCount }}</a
              >
            </li>
          </template>
          <template v-else-if="currentPage === 3">
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage - 2)"
                >{{ currentPage - 2 }}</a
              >
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage - 1)"
                >{{ currentPage - 1 }}</a
              >
            </li>
            <li class="page-item active">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage)"
                >{{ currentPage }}</a
              >
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage + 1)"
                >{{ currentPage + 1 }}</a
              >
            </li>
            <li class="page-item">
              <a class="page-link disabled">...</a>
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', pageCount)"
                >{{ pageCount }}</a
              >
            </li>
          </template>
          <template v-else-if="currentPage === pageCount - 2">
            <li class="page-item ">
              <a class="page-link" @click="$emit('set-current-page', 1)">{{
                1
              }}</a>
            </li>
            <li class="page-item">
              <a class="page-link disabled">...</a>
            </li>
            <li class="page-item -1">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage - 1)"
                >{{ currentPage - 1 }}</a
              >
            </li>
            <li class="page-item active">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage)"
                >{{ currentPage }}</a
              >
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage + 1)"
                >{{ currentPage + 1 }}</a
              >
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage + 2)"
                >{{ currentPage + 2 }}</a
              >
            </li>
          </template>
          <template v-else-if="currentPage === pageCount - 1">
            <li class="page-item ">
              <a class="page-link" @click="$emit('set-current-page', 1)">{{
                1
              }}</a>
            </li>
            <li class="page-item">
              <a class="page-link disabled">...</a>
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage - 1)"
                >{{ currentPage - 1 }}</a
              >
            </li>
            <li class="page-item active">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage)"
                >{{ currentPage }}</a
              >
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage + 1)"
                >{{ currentPage + 1 }}</a
              >
            </li>
          </template>
          <template v-else-if="currentPage === pageCount">
            <li class="page-item ">
              <a class="page-link" @click="$emit('set-current-page', 1)">{{
                1
              }}</a>
            </li>
            <li class="page-item">
              <a class="page-link disabled">...</a>
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage - 1)"
                >{{ currentPage - 1 }}</a
              >
            </li>
            <li class="page-item active">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage)"
                >{{ currentPage }}</a
              >
            </li>
          </template>
          <template v-else>
            <li class="page-item ">
              <a class="page-link" @click="$emit('set-current-page', 1)">{{
                1
              }}</a>
            </li>
            <li class="page-item">
              <a class="page-link disabled">...</a>
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage - 1)"
                >{{ currentPage - 1 }}</a
              >
            </li>
            <li class="page-item active">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage)"
                >{{ currentPage }}</a
              >
            </li>
            <li class="page-item ">
              <a
                class="page-link"
                @click="$emit('set-current-page', currentPage + 1)"
                >{{ currentPage + 1 }}</a
              >
            </li>
            <li class="page-item">
              <a class="page-link disabled">...</a>
            </li>
            <li class="page-item">
              <a
                class="page-link"
                @click="$emit('set-current-page', pageCount)"
                >{{ pageCount }}</a
              >
            </li>
          </template>
        </template>

        <li class="page-item" @click="$emit('set-next-page')">
          <a class="page-link" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <div
      class="col-12 col-md-6 d-flex justify-content-center justify-content-md-start align-items-center mt-3 mt-md-0"
    >
      <span class="me-3">Кол-во пользователей</span>
      <select class="form-select" v-model="usersNum">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageCount: Number,
    usersPerPage: [Number, String],
  },
  computed: {
    usersNum: {
      get() {
        return this.usersPerPage;
      },
      set(val) {
        this.$emit("set-user-count", val);
      },
    },
  },
};
</script>

<style lang="scss">
.v-table-pagination {
  margin-bottom: 30px;
  .pagination {
    margin-bottom: 0;
  }
  .pagination > li > a {
    background-color: white;
    color: #212529;
  }

  .pagination > li > a:focus,
  .pagination > li > a:hover,
  .pagination > li > span:focus,
  .pagination > li > span:hover {
    color: #5a5a5a;
    background-color: #eee;
    border-color: #ddd;
    cursor: pointer;
  }

  .pagination > li > a.disabled:focus,
  .pagination > li > a.disabled:hover,
  .pagination > li > span:focus,
  .pagination > li > span:focus {
    border-color: none;
    background-color: white;
    color: #212529;
    cursor: auto !important;
  }

  .pagination > .active > a {
    color: white;
    background-color: #212529 !important;
    border: solid 1px #212529 !important;
  }

  .pagination > .active > a:hover {
    background-color: #5a4181 !important;
    border: solid 1px #5a4181;
  }
  .form-select {
    width: 200px;
  }
}
</style>
