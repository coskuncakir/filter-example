const selectedFilters = [];

hideFilters();

const showFilters = (event) => {
  hideFilters();
  const id = `${event.target.dataset.id}-filters`;
  document.getElementById(id).style.display = "flex";

  document.querySelector("#column2 .header").innerHTML = `Select ${
    document.getElementById(id).dataset.name
  }`;
};

document.querySelectorAll(".parent-filter").forEach((item) => {
  item.addEventListener("click", showFilters);
});

const removeFilter = (filterValue, filterName) => {
  selectedFilters.forEach((item) => {
    if (item.filters.includes(filterValue)) {
      item.filters.splice(item.filters.indexOf(filterValue), 1);
    }
    if (item.filters.length <= 0) {
      document.getElementById(filterName).remove();
    } else {
      document.getElementById(`selected-${filterValue}`).remove();
    }
  });

  const checkbox = document.querySelectorAll(`input[value="${filterValue}"]`);
  checkbox.forEach((item) => (item.checked = false));

  showSelectedFiltersCount();
};

const selectFilter = (event) => {
  const filterName = event.target.name;
  const filterValue = event.target.value;
  if (event.target.checked) {
    const find = selectedFilters.find((item) => item.name === filterName);

    if (!find) {
      selectedFilters.push({ name: filterName, filters: [filterValue] });
    } else if (!find.filters.includes(filterValue)) {
      selectedFilters.forEach((item) => {
        if (item.name === filterName) {
          item.filters.push(filterValue);
        }
      });
    }

    createElement();
    showSelectedFiltersCount();
  } else {
    removeFilter(filterValue, filterName);
  }
};

document.querySelectorAll("input[type=checkbox]").forEach((item) => {
  item.addEventListener("change", selectFilter);
});

function hideFilters() {
  document.querySelectorAll(".filters").forEach((item) => {
    item.style.display = "none";
  });
}

function showSelectedFiltersCount() {
  let count = 0;

  if (selectedFilters.length > 0) {
    selectedFilters.forEach((item) => {
      count = count + item.filters.length;
    });
  }
  document.querySelector("#column3 .header").innerHTML =
    count > 0 ? `${count} filters selected` : "No filters selected";
}

function createElement() {
  selectedFilters.forEach((item) => {
    let filterGroup = document.getElementById(item.name);

    if (!filterGroup) {
      filterGroup = document.createElement("div");
      filterGroup.id = item.name;
      filterGroup.append(item.name);
      document.getElementById("column3").appendChild(filterGroup);
    }

    item.filters.forEach((filter) => {
      let label = document.getElementById(`selected-${filter}`);

      if (!label) {
        label = document.createElement("label");
        label.setAttribute("id", `selected-${filter}`);
        label.append(filter);

        let button = document.createElement("button");
        button.addEventListener("click", () => {
          removeFilter(filter, item.name);
        });
        button.innerHTML = "X";
        filterGroup.appendChild(label);
        label.appendChild(button);
      }
    });
  });
}
