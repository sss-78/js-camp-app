<?php
$upperBody = <<<EOBODY
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <!-- For responsive page -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Catalog Inquiry Response</title>
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
	print "<strong>Item Category: </strong> ".$_GET["item-choice"]."<br>\n";
    print "<strong>Maximum Cost: </strong> ".$_GET["maximumCost"]."<br>\n"; 
	print "<strong>Available on Campus: </strong>";
	if (isset($_GET["availableOnCampus"])) {
		print "Yes<br>\n";
	} else {
		print "No<br>\n";
	}

    print "<strong>Available Online: </strong>";
	if (isset($_GET["availableOnline"])) {
		print "Yes<br>\n";
	} else {
		print "No<br>\n";
	}

    print "<strong>Additional Information: </strong><br>\n";
    print nl2br($_GET["info"]);

    print "\n<strong>Email Address: </strong> ";
    print $_GET["email"];
    print "</h1>";
    print "</body></html>"
?>
