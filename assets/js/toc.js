function toggleTableOfContents(toggle) {
  const content = document.querySelector(".toc-list");
  content.classList.toggle("hideme");

  toggle.classList.toggle("change");
}
