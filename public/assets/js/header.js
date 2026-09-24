function toggleHeader(header) {
    console.log(header);
    // Get element under header
    const body = header.nextElementSibling;
    
    // Toggle its visibility
    if (body.style.display === 'block') {
    	body.style.display = 'none';
        header.children[0].style.display = 'none';
        header.children[1].style.display = 'block';
    } else {
    	body.style.display = 'block';
        header.children[0].style.display = 'block';
        header.children[1].style.display = 'none';
    }
}
