<template>
  <section
    class="flex items-center h-screen p-16 ml-64 bg-gray-50 text-gray-800"
  >
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="max-w-md text-center">
        <h2 class="mb-8 font-extrabold text-9xl text-gray-400">
          <span class="sr-only">Error</span>404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">
          Sorry, we couldn't find this page.
        </p>
        <p class="mt-4 mb-8 text-gray-600">
          But don't worry, you can find plenty of other things on the homepage.
        </p>
        <a
          rel="noopener noreferrer"
          href="#"
          class="px-8 py-3 font-semibold rounded bg-navy hover:bg-navy-lighter text-white transition duration-150"
          >Back to homepage</a
        >
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>
