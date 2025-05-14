<script>
  import { onMount } from "svelte";

  let shifts = [];
  let locations = [];
  let users = [];
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const [shiftsRes, locationsRes, usersRes] = await Promise.all([
        fetch("http://localhost:3000/shifts"),
        fetch("http://localhost:3000/locations"),
        fetch("http://localhost:3000/users"),
      ]);

      if (!shiftsRes.ok || !locationsRes.ok || !usersRes.ok) {
        throw new Error("Failed to fetch data");
      }

      shifts = await shiftsRes.json();
      locations = await locationsRes.json();
      users = await usersRes.json();
    } catch (e) {
      error = e.message || "An error occurred";
    } finally {
      loading = false;
    }
  });
</script>

<main class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Shift Management Dashboard</h1>

  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <p class="text-red-500">{error}</p>
  {:else}
    <div class="grid gap-4">
      <!-- Shifts List -->
      <section>
        <h2 class="text-xl font-semibold mb-2">Upcoming Shifts</h2>
        <div class="grid gap-2">
          {#each shifts as shift}
            <div class="border p-4 rounded">
              <p>Start: {new Date(shift.startTime).toLocaleString()}</p>
              <p>End: {new Date(shift.endTime).toLocaleString()}</p>
              <p>Status: {shift.status}</p>
            </div>
          {/each}
        </div>
      </section>
    </div>
  {/if}
</main>
