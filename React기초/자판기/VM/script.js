document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------
    // 1. 상태 (State) 및 초기 데이터
    // --------------------------------------------------

    // 자판기의 모든 데이터를 관리하는 객체
    let state = {
        products: [],
        vmMoney: 0,   // 총 판매금액
        inMoney: 0    // 사용자가 투입한 금액
    };

    // 기본 상품 데이터 (localStorage에 데이터가 없을 경우 사용)
    const defaultProducts = [
        { id: 'milk', name: '밀크커피', price: 300, stock: 5, imageSrc: 'img/milkOut.png' },
        { id: 'sugar', name: '설탕커피', price: 500, stock: 5, imageSrc: 'img/sugarOut.png' },
        { id: 'black', name: '블랙커피', price: 200, stock: 5, imageSrc: 'img/blackOut.png' },
        { id: 'canCoffee', name: '캔커피', price: 700, stock: 5, imageSrc: 'img/cancoffee1.png' },
        { id: 'cider', name: '캔사이다', price: 600, stock: 5, imageSrc: 'img/cider1.png' },
        { id: 'cola', name: '캔콜라', price: 650, stock: 5, imageSrc: 'img/cola1.png' }
    ];


    // --------------------------------------------------
    // 2. DOM 요소 선택
    // --------------------------------------------------

    const $productList = document.getElementById('products-list');
    const $inMoney = document.getElementById('inMoney');
    const $vmMoney = document.getElementById('vmMoney');
    const $controls = document.getElementById('controls');
    const $returnCoin = document.getElementById('returnCoin');
    const $coffeeOut = document.getElementById('coffeeOut');
    const $takeOutBtn = document.getElementById('takeOutBtn');
    const $coinOut = document.getElementById('coinOut');

    // 관리자 UI 요소
    const $adminToggle = document.getElementById('admin-toggle');
    const $adminPanel = document.getElementById('admin-panel');
    const $productForm = document.getElementById('product-form');
    const $formClearBtn = document.getElementById('form-clear-btn');
    const $adminProductList = document.getElementById('admin-product-list');


    // --------------------------------------------------
    // 3. 렌더링 함수 (데이터를 화면에 그리는 역할)
    // --------------------------------------------------

    /** 모든 UI를 현재 state에 맞게 업데이트하는 메인 함수 */
    function render() {
        renderProducts();
        renderAdminList();
        updateButtonsState();
        updateMoneyDisplay();
    }

    /** 상품 목록을 화면에 렌더링 */
    function renderProducts() {
        $productList.innerHTML = state.products.map(p => `
            <li class="product-item">
                <img src="${p.imageSrc}" alt="${p.name}">
                <p>${p.name} (${p.stock}개)</p>
                <p>가격: <span>${p.price}</span>원</p>
                <button class="buy-btn" data-id="${p.id}" disabled>${p.name}</button>
            </li>
        `).join('');
    }

    /** 관리자 패널의 상품 목록을 렌더링 */
    function renderAdminList() {
        $adminProductList.innerHTML = state.products.map(p => `
            <div class="admin-item">
                <span>${p.name} / ${p.price}원 / ${p.stock}개</span>
                <div>
                    <button class="edit-btn" data-id="${p.id}">수정</button>
                    <button class="delete-btn" data-id="${p.id}">삭제</button>
                </div>
            </div>
        `).join('');
    }
    
    /** 투입 금액과 총 판매금액을 화면에 업데이트 */
    function updateMoneyDisplay() {
        $inMoney.value = state.inMoney;
        $vmMoney.textContent = state.vmMoney;
    }

    /** 투입 금액과 재고에 따라 버튼 활성화/비활성화 상태 업데이트 */
    function updateButtonsState() {
        document.querySelectorAll('.buy-btn').forEach(btn => {
            const product = findProductById(btn.dataset.id);
            if (product) {
                btn.disabled = state.inMoney < product.price || product.stock <= 0;
            }
        });
    }


    // --------------------------------------------------
    // 4. 이벤트 핸들러 및 로직
    // --------------------------------------------------

    /** 동전 투입 처리 */
    function handleCoinInsert(event) {
        if (!event.target.classList.contains('coin-btn')) return;
        
        state.inMoney += parseInt(event.target.dataset.value, 10);
        updateMoneyDisplay();
        updateButtonsState();
    }

    /** 상품 구매 처리 */
    function handlePurchase(event) {
        if (!event.target.classList.contains('buy-btn')) return;

        const productId = event.target.dataset.id;
        const product = findProductById(productId);

        if (product && state.inMoney >= product.price && product.stock > 0) {
            // 상태 업데이트
            state.inMoney -= product.price;
            state.vmMoney += product.price;
            product.stock--;

            // UI 업데이트
            $coffeeOut.innerHTML = `<img src="${product.imageSrc}" alt="${product.name}">`;
            $takeOutBtn.style.display = 'block';
            $coinOut.innerHTML = ''; // 잔돈반환구 초기화

            saveState(); // 변경된 상태 저장
            render();     // 화면 전체 새로고침
        } else {
            alert('금액이 부족하거나 재고가 없습니다.');
        }
    }

    /** 잔돈 반환 처리 */
    function returnChange() {
        $coinOut.innerHTML = `${state.inMoney} 원이 반환되었습니다.`;
        state.inMoney = 0;
        updateMoneyDisplay();
        updateButtonsState();
    }
    
    /** 상품 꺼내기 처리 */
    function takeOutProduct() {
        $coffeeOut.innerHTML = '꺼내주세요!';
        $takeOutBtn.style.display = 'none';
    }
    
    /** 관리자 모드 토글 */
    function toggleAdminMode() {
        const isHidden = $adminPanel.style.display === 'none';
        $adminPanel.style.display = isHidden ? 'block' : 'none';
        $adminToggle.textContent = isHidden ? '관리자 모드 닫기' : '관리자 모드';
    }
    
    /** 관리자 상품 폼 제출 처리 (추가/수정) */
    function handleFormSubmit(event) {
        event.preventDefault();
        const id = document.getElementById('product-id').value;
        const newProductData = {
            name: document.getElementById('product-name').value,
            price: parseInt(document.getElementById('product-price').value, 10),
            stock: parseInt(document.getElementById('product-stock').value, 10),
            imageSrc: document.getElementById('product-image').value
        };

        if (id) { // 수정
            const product = findProductById(id);
            Object.assign(product, newProductData);
        } else { // 추가
            const newProduct = { ...newProductData, id: 'prod_' + Date.now() };
            state.products.push(newProduct);
        }
        
        saveState();
        render();
        clearForm();
    }
    
    /** 관리자 목록 버튼 클릭 처리 (수정/삭제) */
    function handleAdminListClick(event) {
        const target = event.target;
        const id = target.dataset.id;

        if (target.classList.contains('edit-btn')) {
            const product = findProductById(id);
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-stock').value = product.stock;
            document.getElementById('product-image').value = product.imageSrc;
        }

        if (target.classList.contains('delete-btn')) {
            if (confirm('정말로 이 상품을 삭제하시겠습니까?')) {
                state.products = state.products.filter(p => p.id !== id);
                saveState();
                render();
            }
        }
    }

    // --------------------------------------------------
    // 5. 유틸리티 함수
    // --------------------------------------------------

    /** ID로 상품 객체 찾기 */
    function findProductById(id) {
        return state.products.find(p => p.id === id);
    }

    /** 관리자 폼 초기화 */
    function clearForm() {
        $productForm.reset();
        document.getElementById('product-id').value = '';
    }

    /** 현재 상태를 localStorage에 저장 */
    function saveState() {
        localStorage.setItem('vendingMachineState', JSON.stringify(state));
    }

    /** localStorage에서 상태 불러오기 */
    function loadState() {
        const savedState = localStorage.getItem('vendingMachineState');
        if (savedState) {
            state = JSON.parse(savedState);
        } else {
            // 저장된 상태가 없으면 기본 상품으로 초기화
            state.products = defaultProducts;
        }
    }


    // --------------------------------------------------
    // 6. 초기화 및 이벤트 리스너 등록
    // --------------------------------------------------

    function initialize() {
        loadState();
        render();

        // 이벤트 리스너 등록 (이벤트 위임 활용)
        $controls.addEventListener('click', handleCoinInsert);
        $productList.addEventListener('click', handlePurchase);
        $returnCoin.addEventListener('click', returnChange);
        $takeOutBtn.addEventListener('click', takeOutProduct);
        
        // 관리자 관련 이벤트 리스너
        $adminToggle.addEventListener('click', toggleAdminMode);
        $productForm.addEventListener('submit', handleFormSubmit);
        $formClearBtn.addEventListener('click', clearForm);
        $adminProductList.addEventListener('click', handleAdminListClick);
    }

    // 자판기 시작!
    initialize();
});