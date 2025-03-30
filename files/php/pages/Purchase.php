<?php include("../templates/head.php");?>
    <link rel="stylesheet" href="../../css/pages/Purchase_style.css">
    <title>SKYGREEN</title>
</head>
<body>
    <?php include("../templates/header.php");?>
    <main>
        <form action="" id="personal_data">
            <div id="client_data">
                <label for="first_name">First name</label>
                <label for="last_name">Last name</label>
                <input type="text" id="first_name" name="first_name">
                <input type="text" id="last_name" name="last_name">
                <label for="phone">Phone</label>
                <label for="email_address">Email address</label>
                <input type="number" id="phone" name="phone" placeholder="+1 212 555 1234">
                <input type="email" id="email_address" name="email_address" placeholder="text@type.dom">
                <label for="company_name">Company name (optional)</label>
                <input type="text" id="company_name" name="company_name">
            </div>
            <div id="direction_data">
                <label for="house_number">House number</label>
                <label for="street_name">Street name</label>
                <input type="text" id="house_number" name="house_number">
                <input type="text" id="street_name" name="street_name">
                <label for="house_extra_info">House info (optional)</label>
                <input type="text" id="house_extra_info" name="house_extra_info" placeholder="Apartment, Floor, Suite, Room, Etc.">
                <label for="town_city">City / Town</label>
                <label for="state">State</label>
                <input type="text" id="town_city" name="town_city">
                <select id="state" name="state">
                    <option value="Alabama">Alabama</option>
                    <option value="Alaska">Alaska</option>
                    <option value="Arizona">Arizona</option>
                    <option value="Arkansas">Arkansas</option>
                    <option value="California">California</option>
                    <option value="North Carolina">North Carolina</option>
                    <option value="South Carolina">South Carolina</option>
                    <option value="Colorado">Colorado</option>
                    <option value="Connecticut">Connecticut</option>
                    <option value="North Dakota">North Dakota</option>
                    <option value="South Dakota">South Dakota</option>
                    <option value="Delaware">Delaware</option>
                    <option value="Florida">Florida</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Hawaii">Hawaii</option>
                    <option value="Idaho">Idaho</option>
                    <option value="Illinois">Illinois</option>
                    <option value="Indiana">Indiana</option>
                    <option value="Iowa">Iowa</option>
                    <option value="Kansas">Kansas</option>
                    <option value="Kentucky">Kentucky</option>
                    <option value="Louisiana">Louisiana</option>
                    <option value="Maine">Maine</option>
                    <option value="Maryland">Maryland</option>
                    <option value="Massachusetts">Massachusetts</option>
                    <option value="Michigan">Michigan</option>
                    <option value="Minnesota">Minnesota</option>
                    <option value="Mississippi">Mississippi</option>
                    <option value="Missouri">Missouri</option>
                    <option value="Montana">Montana</option>
                    <option value="Nebraska">Nebraska</option>
                    <option value="Nevada">Nevada</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="New York">New York</option>
                    <option value="New Hampshire">New Hampshire</option>
                    <option value="New Mexico">New Mexico</option>
                    <option value="Ohio">Ohio</option>
                    <option value="Oklahoma">Oklahoma</option>
                    <option value="Oregon">Oregon</option>
                    <option value="Pennsylvania">Pennsylvania</option>
                    <option value="Rhode Island">Rhode Island</option>
                    <option value="Tennessee">Tennessee</option>
                    <option value="Texas">Texas</option>
                    <option value="Utah">Utah</option>
                    <option value="Vermont">Vermont</option>
                    <option value="Virginia">Virginia</option>
                    <option value="West Virginia">West Virginia</option>
                    <option value="Washington">Washington</option>
                    <option value="Wisconsin">Wisconsin</option>
                    <option value="Wyoming">Wyoming</option>
                </select>
                <label for="zip_code">Zip code</label>
                <label for="order_notes">Order notes (optional)</label>
                <input type="number" id="zip_code" name="zip_code" placeholder="10001">
                <textarea id="order_notes" name="order_notes" placeholder="Additional details regarding your order, such as special instructions for delivery."></textarea>
            </div>
        </form>
        <section id="products">

        </section>
    </main>
    <script type="module" src="../../js/pages/Purchase_script.js"></script>
</body>
</html>