const ACTIVE_CLASS = 'active'
const tabItems = document.querySelectorAll('.js-tab-button');
const indicator = document.querySelector('.js-tab-indicator');
const tabsMenu = document.querySelector('.js-tabs-menu');

const indicatorPosition = tabItems[0].getBoundingClientRect().left - tabsMenu.getBoundingClientRect().left;
indicator.style.width = `${tabItems[0].clientWidth}px`;

tabItems.forEach(tab => {
  tab.setAttribute('aria-selected', 'false');
  tab.addEventListener('click', (e) => {
    handleTabSelection(e);
    
    const current = document.querySelector(`.focus`);
    if(current) {
      current.className = current.className.replace(` focus`, ''); 
    }
  })
  tab.addEventListener('mousedown', handleRippleEffect);
  tab.addEventListener('keydown', handleArrowKeysFocus);
});

function handleTabSelection(e) {
  toggleActiveClass(e);
  moveTabIndicator(e);
  handleA11y(e);
}

function toggleActiveClass(e) {
  const current = document.querySelector(`.${ACTIVE_CLASS}`);
  if(current) {
    current.className = current.className.replace(` ${ACTIVE_CLASS}`, '');
  }

  e.target.className += ` ${ACTIVE_CLASS}`;
}

function toggleFocusClass(e) {
  const current = document.querySelector(`.focus`);
  if(current) {
    current.className = current.className.replace(` focus`, ''); 
  }
  
  e.currentTarget.className += ` focus`;
}

function moveTabIndicator(e) {
  const indicatorPosition = e.target.getBoundingClientRect().left - tabsMenu.getBoundingClientRect().left;
  indicator.style.width = `${e.target.clientWidth}px`;
  indicator.style.left = `${indicatorPosition}px`;
}

function handleRippleEffect(e) {
  const posX = e.target.offsetLeft;
  const posY = e.target.offsetTop;
  const span = document.createElement('span');
  const x = e.pageX - e.target.getBoundingClientRect().left;
  const y = e.pageY - e.target.getBoundingClientRect().top;
  
  span.classList.add('tab-button__ripple');
  e.target.appendChild(span);
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;

  setTimeout(() => {
    span.remove();
  }, 1000);
}

function handleA11y(e) {
  tabItems.forEach(tab => {
    const addActiveFocus = () => {
      e.target.setAttribute('aria-selected', 'true')
      e.target.setAttribute('tabindex', '0');
    };
  
    const removeActiveFocus = () => {
      tab.setAttribute('aria-selected', 'false');
      tab.setAttribute('tabindex', '-1');
    };
     tab === e.target ? addActiveFocus() : removeActiveFocus();
  });
}

function handleArrowKeysFocus(e) {
  const totalTabItems = tabItems.length - 1;
  const leftArrowKey = e.which === 37;
  const rightArrowKey = e.which === 39;

  let index = Array.prototype.indexOf.call(tabItems, e.currentTarget);
  let newIndex;
  
  const decrementIndex = () => {
    newIndex = index - 1;

    if (newIndex < 0) {
      newIndex = totalTabItems;
    }
  }
  
  const incrementIndex = () => {
    newIndex = index + 1;

    if (newIndex > totalTabItems) {
      newIndex = 0;
    }
  }

  if (leftArrowKey) {
    decrementIndex();
    toggleFocusClass(e);
  }

  if (rightArrowKey) {
    incrementIndex();
    toggleFocusClass(e);
  }
  
  const current = document.querySelector(`.focus`);
  if(current) {
    current.className = current.className.replace(` focus`, ''); 
  }
  
  if (tabItems[newIndex]) {
    tabItems[newIndex].className += ` focus`;    
    tabItems[newIndex].focus();
  }
}

// Initially activate the first tab
tabItems[0].setAttribute('tabindex', '0');
tabItems[0].setAttribute('aria-selected', 'true');