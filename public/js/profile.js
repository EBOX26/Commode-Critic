const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#reviews').ariaValueMax.trim();
    const description = document.querySelector('review').value.trim();

    if(name && description) {
        const response = await fetch(`/api/reviews`, {
            method: 'POST', 
            body:JSON.stringify({ name, reviews }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create a review');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data_id)')) {
        const id = event.target.getAttribute(data_id);

        const response = await fetch (`/api/${id}`, {
            method: 'DELETE',
        });  //what do I grab?

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete project');
        }
    }
};

document //Im lost here
    .querySelector('.review-list)
    .addEventListner('sumbit',  newFormHandler);