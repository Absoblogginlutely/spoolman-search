(function () {
    const LINK_URL = "/search/home.html";
    const LINK_TEXT = "Search";

    function inject() {
        // Find the Home menu item
        const homeItem = [...document.querySelectorAll("li.ant-menu-item")]
            .find(el => el.textContent.trim() === "Home");

        if (!homeItem) return; // Sidebar not rendered yet

        // Avoid duplicates
        if ([...document.querySelectorAll("a")].some(a => a.href.endsWith(LINK_URL))) return;

        // Create <li>
        const li = document.createElement("li");
        li.className = "ant-menu-item";
        li.setAttribute("role", "menuitem");
        li.style.paddingLeft = "24px";

        // Icon wrapper
        const iconSpan = document.createElement("span");
        iconSpan.className = "anticon anticon-search ant-menu-item-icon";
        iconSpan.setAttribute("role", "img");
        iconSpan.setAttribute("aria-label", "search");

        // Inline SVG (Ant Design search icon)
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "64 64 896 896");
        svg.setAttribute("focusable", "false");
        svg.setAttribute("data-icon", "search");
        svg.setAttribute("width", "1em");
        svg.setAttribute("height", "1em");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("aria-hidden", "true");
        svg.innerHTML = `
            <path d="M909.6 854.5L650.3 595.2c48.1-58.3 77-132.7 77-214C727.3 231.7 595.6 100 436.6 100S146 231.7 146 381.2s131.7 281.2 290.7 281.2c81.3 0 155.7-28.9 214-77l259.3 259.3a31.9 31.9 0 0045.2 0l-45.6-45.6zM436.6 600c-120.7 0-218.8-98.1-218.8-218.8S315.9 162.5 436.6 162.5 655.4 260.6 655.4 381.2 557.3 600 436.6 600z"></path>
        `;

        iconSpan.appendChild(svg);

        // Text wrapper
        const textSpan = document.createElement("span");
        textSpan.className = "ant-menu-title-content";

        const link = document.createElement("a");
        link.href = LINK_URL;
        link.textContent = LINK_TEXT;

        textSpan.appendChild(link);

        // Assemble
        li.appendChild(iconSpan);
        li.appendChild(textSpan);

        // Insert after Home
        homeItem.insertAdjacentElement("afterend", li);
    }

    // Observe until sidebar is ready
    const observer = new MutationObserver(() => inject());
    observer.observe(document.body, { childList: true, subtree: true });

    inject();
})();
