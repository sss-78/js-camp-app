<?php
$upperBody = <<<EOBODY
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <!-- For responsive page -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Placing Order Response</title>
    <style>
        strong {
            color: red;
        }
    </style>
</head>

<body>
EOBODY;
    print $upperBody;
	print "<h1>";
	print "<strong>First Name: </strong> ".$_POST["firstName"]."<br>\n";
    print "<strong>Last Name: </strong> ".$_POST["lastName"]."<br>\n";
    print "<strong>Street Address: </strong> ".$_POST["streetaddr"]."<br>\n";
    print "<strong>City: </strong> ".$_POST["city"]."<br>\n";
    print "<strong>State: </strong> ".$_POST["state"]."<br>\n";
    print "<strong>Zip Code: </strong> ".$_POST["zipcode"]."<br>\n";

    print "<strong>Email Address: </strong>";
    print $_POST["email"]."<br>\n";
    print "</h1>";
    print "</body></html>"
?>
