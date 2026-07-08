
    async function getPincodeData() {
        const searchInput = document.getElementById("search");
        const dataDiv = document.getElementById("data");
        const message = document.getElementById("message");

        try {
            const response = await fetch(`https://api.postalpincode.in/pincode/${searchInput.value}`)
            if (!response.ok) {
                throw new Error("Network Error");

            }
            const data = await response.json();
            // console.log(data);

            if (data[0].Status === "Success" && data[0].PostOffice) {
                message.innerHTML = data[0].Message;
                dataDiv.innerHTML = ""
                for (const post of data[0].PostOffice) {
                    dataDiv.innerHTML += `
                    <div class="card">
                        <h2>🏣 ${post.Name} </h2>
                        <p><strong>District:</strong> ${post.District} </p>
                        <p><strong>State:</strong> ${post.State} </p>
                    </div>
                    `
                }
                // data[0].PostOffice.forEach(post => {
                //     dataDiv.innerHTML += `
                //     <h1> ${post.Name}</h1>
                //     <p> ${post.District}</p>
                //     <p> ${post.State}</p>
                //     `
                // });
            } else {
                message.innerHTML = data[0].Message;
                dataDiv.innerHTML = "";
            }

        } catch (error) {
            console.log(error);
            dataDiv.innerHTML = "Oops! Something went wrong."
        }
        finally {
            searchInput.value = "";
        }
    }

