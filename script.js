const bossNames = ['Jukk','Lojak','Mohaca','Sterl','Takedar','Terro'];
const bossParts = ['head','torso','left-shoulder','left-hand','left-leg','right-leg','right-hand','right-shoulder'];
const mapPatternToStrategy = {0:'forbidden',1:'attack',2:'vm',3:'cursed'};
const patternStrategyRegExp = new RegExp('[A-Za-z]+_([0-3],){7}[0-3]');


/**
 * Select the image of the corresponding boss from the combo box
 * @param sel
 */
function selectBoss(sel)
{
    $('#boss-image').attr("src","img/"+sel.value);
    $('.strategy').attr("id",sel.value.replaceAll(".gif",""));
    if(sel.value=="Instructions.gif"){
        $('.strategy').addClass("hidden");
    }
    else
    {
        $('.strategy').removeClass("hidden");
    }

}
function getParams()
{
    const queryString = window.location.search;
    var tab = queryString.split("?");
    applyStrategyByPattern(tab[1]);
}
window.onload = function() {
    getParams();
}
/**
 * Pattern expected :
 * NameOfTheBoss_0,1,2,0,0,0,0,1
 * 0 : forbidden
 * 1 : attack
 * 2 : VM
 * 3 : cursed
 *
 * Order :
 * Right Shoulder, Head, Left Shoulder
 * Right Hand, Torso, Left Hand
 * Right Leg, Left Leg
 * @param strategyPattern
 */
function applyStrategyByPattern(strategyPattern)
{
    if(strategyPattern == undefined) return;
    if(strategyPattern == "field") strategyPattern = document.getElementById("pattern-strategy").value;
    let bossAndStrategy = strategyPattern.split("_");
    let bossName = bossAndStrategy[0];
    let strategy =  bossAndStrategy[1].split(",");
    let rightShoulder = mapPatternToStrategy[strategy[0]];
    let head = mapPatternToStrategy[strategy[1]];
    let leftShoulder = mapPatternToStrategy[strategy[2]];
    let rightHand =mapPatternToStrategy[strategy[3]];
    let torso = mapPatternToStrategy[strategy[4]];
    let leftHand = mapPatternToStrategy[strategy[5]];
    let rightLeg = mapPatternToStrategy[strategy[6]];
    let leftLeg = mapPatternToStrategy[strategy[7]];
    checkRadio("right-shoulder",rightShoulder);
    checkRadio("head",head);
    checkRadio("left-shoulder",leftShoulder);
    checkRadio("right-hand",rightHand);
    checkRadio("torso",torso);
    checkRadio("left-hand",leftHand);
    checkRadio("right-leg",rightLeg);
    checkRadio("left-leg",leftLeg);
    selectComboBoxBoss(bossName);
    takeshot();
}

function selectComboBoxBoss(bossNameToSelect){
    $("#boss-select").val(bossNameToSelect+".gif").change();
}

function takeshot(){
      // Define the function 
        // to screenshot the div

            let div = document.getElementById('image');
            div.style.display = "block";
            document.getElementById('output').innerHTML = "";
            // Use the html2canvas
            // function to take a screenshot
            // and append it
            // to the output div
            html2canvas(div, {width: 800, allowTaint: true , scrollX:-12, scrollY: -window.scrollY}).then(
                function (canvas) {
                    document
                    .getElementById('output')
                    .appendChild(canvas);
                    div.style.display = "none";
                })
}

/**
 * From pattern approach to check the radio accordingly
 * @param bossPart
 * @param currentRadioValue
 */
function checkRadio(bossPart,currentRadioValue) {
   // $("input[name='"+bossPart+"'][id='"+bossPart+"-"+currentRadioValue+"']:radio").prop("checked",true);
    let selector = "#"+bossPart+"-"+currentRadioValue;
    //console.log("try to check $(\""+selector+"\")");
    //You need to add the .change() otherwise it was only checking the radio but without chaining the change effect
    $(selector).prop("checked",true).change();
}

/**
 * Will change the image of the strategy to apply when selected
 * - Supported value :
 *  o attack
 *  o forbidden
 *  o vm
 * @param currentRadioValue : the value of the selected radio
 * @param imgSelectorId : the css selector to point to the image
 */
function changeStrategyImage(currentRadioValue,imgSelectorId) {
    if (currentRadioValue == 'attack') {
        $(imgSelectorId).attr("src","icon/ToAttack.gif");
    }
    else if (currentRadioValue == 'forbidden') {
        $(imgSelectorId).attr("src","icon/29.90.gif");
    }
    else if (currentRadioValue == 'vm') {
        $(imgSelectorId).attr("src","icon/VictoryMarch.gif")
    }
    else if (currentRadioValue == 'cursed') {
        $(imgSelectorId).attr("src","icon/Logo-maudit.gif")
    }
}

/**
 * Register listener of radio changes to trigger strategy image change
 */
$(document).ready(function(){

    bossParts.forEach( bossPart =>
        //Add Head radio listener
        $("input[name='"+bossPart+"']:radio").change(function(){
            changeStrategyImage(this.value,"."+bossPart)
        })
    );

});

