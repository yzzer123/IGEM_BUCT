
     //MENU FUNCTIONALITY //

     // ONCE THE PAGE LOADS, DECIDES WHICH MENU TO CALL/SHOW //


     var hub_list = new Array(); //Array with the list of hub menus 
hub_list[0]= "Code_Documentation";


     var currentHubMenu; // Save the current menu that needs to be displayed


$(document).ready(function() {
	currentHubMenu = findCurrentHubMenu();

	if (currentHubMenu) {// if the function returns a positive value - there is a hub menu  display it

	    whichPageMenu( "https://2019.igem.org/HQ:Menu" + " " + "#" + currentHubMenu );
	} 

	else { // if the value is negative, show the main menu
	    showMainMenu();
	}

    });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





//LOOK FOR A MENU BASED ON THE HUB LIST ARRAY
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var findCurrentHubMenu = function() {   // Look for the hub menu

    for ( var i=0; i< hub_list.length; i++ ) {

	if ( wgPageName.indexOf( hub_list[i] ) > -1 ) {
	    return hub_list[i];            //return that it has been found
	}
    }       
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





// THIS CALLS THE HUB MENU THAT IS SPECIFIED
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function whichPageMenu( div_to_Load ) {

	$( "#menuDisplay" ).load( div_to_Load, function() {
		activateLoadedMenu(); 
	    } );

    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 



// SHOW MAIN MENU - hide navigation between hub menus since it is not needed
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showMainMenu() {

    $( "#menuDisplay" ).load( "https://2019.igem.org/HQ:Menu #MainPage_menu", function() {

	    activateLoadedMenu();

	    // MODIFIES THE CSS TO HIDE THE NAVIGATE BETWEEN MENUS BUTTON
	    $(".sideMenu").css( "padding-bottom", "0px" );
	    $(".switch_Menus").css( "display", "none" );
	    $(".sideMenuTitle").css( "width", "170" );
$(".sideMenuTitle").css( "margin-left", "-15px" );

 } );

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// ACTIVATE CERTAIN FUNCTIONS ONCE THE MENU IS LOADED 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function activateLoadedMenu() {

//default collapses the submenus
$(".subMenu").hide();

//toggle function
$(".subMenu_toggle").click(function() {
jQuery(this).next("div").slideToggle();
 });

 // this calls the expand all function 
$(".expand_subMenus").click(function() {
subMenus_ShowHide();
 });


// this allows the navigation between hub menu and main menu

$( ".switch_Menus").click( function() {


if($('#MainPage_menu').is(':visible')) {                            // if the main menu is displayed, call the hub menu that is needed 
                                        whichPageMenu( "https://2019.igem.org/HQ:Menu" + " " + "#" +  currentHubMenu );
}

else   { //else display the main menu
    $(".switch_Menus").html(" &#9654; ");  
    whichPageMenu( "https://2019.igem.org/HQ:Menu #MainPage_menu" ); 

}


    } );

}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






//COLLAPSE ALL OR EXPAND ALL FOR SUBMENUS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// this is the expand all function 
function subMenus_ShowHide() {

    if ( $('.subMenu:visible').length == 0) {
	$(".expand_subMenus").html(" -  ");
	$(".subMenu").show();
    }

    // to close 
    else {
	$(".expand_subMenus").html("+ ");
	$(".subMenu").hide();
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// END MENU FUNCTIONALITY












// POP WHY ( ? )
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var which_why= "why_default";//STORES WHAT WHY IS BEING CALLED, has a default assigned


$(".pop_why").click(function() {//IF A POP WHY IS CLICKED

	which_why = "https://2019.igem.org/HQ:Why"+" " + "#" +which_why;

	$( ".pop_why_content" ).load( which_why , function() {

		$(".pop_close").click(function() {
			remove_popwhy();
		    });

		$(".pop_why_cover").click(function() {
			remove_popwhy();
		    });

	    } );



	//MODIFY SIZE AND POSITION OF THE POP DIV AND THE BACKGROUND
	$(".pop_why_box").css( "top", event.pageY);
	$(".pop_why_cover").css ("height" , $(document).height() );
	$(".pop_why_cover").css ("width" , $(document).width() );

	// CALL BOTH ELEMENTS
	$(".pop_why_box").show();
	$(".pop_why_cover").show();
    });



// IF THE CLOSE BUTTON IS CLICKED OR ANYTHING OUTSIDE THE POP WHY DIV
function remove_popwhy () {

    $(".pop_why_box").hide();
    $(".pop_why_cover").hide();
    $( ".pop_why_content" ).empty();

}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// END POP WHY ( ? )



// CLICK_OPEN =  EXPAND OR COLLAPSE CONTENT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".click_open").click(function() {

	//if the content is hidden, show it
	if ( $('.click_content:visible').length == 0) {
	    $(".click_content").show();
	    $(".click_icon").html("鈻?);
	    $(".click_open").css("background-color", "#ffffff");
	}

	else {
	    $(".click_content").hide();
	    $(".click_icon").html("鈻?);
	    $(".click_open").css("background-color", "#f2f2f2");
	}

    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
