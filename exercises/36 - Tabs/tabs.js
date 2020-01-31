console.log('ya ya wes we get it.. IT WORKS!');

const tabs = document.querySelector('.tabs');
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = tabs.querySelectorAll('[role="tabpanel"]');


tabButtons.forEach(button=>{
    button.addEventListener('click',handleTabClick);
});

function handleTabClick(event){

    // console.log(event.currentTarget);

    //hide all tab panels
    tabPanels.forEach( panel =>{
        panel.hidden=true;
    });
    //mark all tabs as unselected
    tabButtons.forEach( tab => {
        // tab['aria-selected'] = 'false';
        tab.setAttribute('aria-selected',false);
    });

    //mark the click tab as selected
    event.currentTarget.setAttribute('aria-selected', true);
    
    //find associate panel to show it
    const id = event.currentTarget.id;

    //method 1;
    // const tabPanel= tabs.querySelector(`[aria-labelledby=${id}]`);
    // tabPanel.hidden = false;
    
    //OR //method 2;

    // tabPanels.forEach(panel => {
    //     // console.log(panel.ariaLabelledby, event.currentTarget.id);
    //     if (panel.getAttribute('aria-labelledby') == event.currentTarget.id) {
    //          panel.hidden = false;
    //     }
    // });

    //method 3
    //Array.from(tabPanels)
    const tabPanel = [...tabPanels].find(panel=>{
        return panel.getAttribute('aria-labelledby') == event.currentTarget.id;
    });
    tabPanel.hidden = false;

};