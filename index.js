// 获取 DOM 元素
const urlInput = document.getElementById('urlInput');
const parseBtn = document.getElementById('parseBtn');
const jsonPanel = document.getElementById('jsonPanel');

// URL解析函数
function parseURL(url) {
  try {
    const urlObj = new URL(url);
    const params = {};
    
    // 解析query参数并decode
    for (const [key, value] of urlObj.searchParams.entries()) {
      const decodedValue = decodeURIComponent(value);
      
      // 处理同名参数（转换为数组）
      if (params[key]) {
        if (Array.isArray(params[key])) {
          params[key].push(decodedValue);
        } else {
          params[key] = [params[key], decodedValue];
        }
      } else {
        params[key] = decodedValue;
      }
    }
    
    // 返回完整的URL解析结果
    return {
      protocol: urlObj.protocol,
      host: urlObj.host,
      hostname: urlObj.hostname,
      port: urlObj.port || null,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      origin: urlObj.origin,
      query: params
    };
  } catch (error) {
    return { 
      error: `URL解析失败: ${error.message}`,
      message: '请确保输入的是有效的URL格式'
    };
  }
}

// 递归渲染JSON树，支持语法高亮和折叠
function renderJSONTree(obj, level = 0) {
  if (obj === null) {
    return '<span class="json-null">null</span>';
  }
  
  if (typeof obj === 'boolean') {
    return `<span class="json-boolean">${obj}</span>,`;
  }
  
  if (typeof obj === 'number') {
    return `<span class="json-number">${obj}</span>,`;
  }
  
  if (typeof obj === 'string') {
    return `<span class="json-string">"${escapeHTML(obj)}"</span>,`;
  }
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return '<span class="json-bracket">[</span><span class="json-bracket">]</span>,';
    }
    
    const isCollapsed = level > 1; // 深层嵌套默认折叠
    const children = obj.map(item => 
      `<div class="json-item" style="margin-left: ${(level + 1) * 20}px;">
        ${renderJSONTree(item, level + 1)}
      </div>`
    ).join('\n');
    
    return `<div class="json-array">
      <span class="json-collapser" data-level="${level}">${isCollapsed ? '+' : '-'}</span>
      <span class="json-bracket">[</span>
      <div class="json-children" style="display: ${isCollapsed ? 'none' : 'block'};">
        ${children}
      </div>
      <span class="json-bracket">]</span>
    </div>`;
  }
  
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) {
      return '<span class="json-bracket">{</span><span class="json-bracket">}</span>';
    }
    
    const isCollapsed = level > 1; // 深层嵌套默认折叠
    const children = keys.map(key => {
      const value = obj[key];
      return `<div class="json-item" style="margin-left: ${(level + 1) * 20}px;">
        <span class="json-key">"${escapeHTML(key)}"</span>: ${renderJSONTree(value, level + 1)}
      </div>`;
    }).join('');
    
    return `<div class="json-object">
      <span class="json-collapser" data-level="${level}">${isCollapsed ? '+' : '-'}</span>
      <span class="json-bracket">{</span>
      <div class="json-children" style="display: ${isCollapsed ? 'none' : 'block'};">
        ${children}
      </div>
      <span class="json-bracket">}</span>
    </div>`;
  }
  
  return `<span class="json-string">"${escapeHTML(String(obj))}"</span>`;
}

// HTML转义函数
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

// 绑定折叠/展开事件
function bindCollapsers() {
  const collapsers = jsonPanel.querySelectorAll('.json-collapser');
  collapsers.forEach(collapser => {
    collapser.onclick = function(e) {
      const container = this.parentElement;
      const children = container.querySelector('.json-children');
      const isCollapsed = children.style.display === 'none';
      
      children.style.display = isCollapsed ? 'block' : 'none';
      this.textContent = isCollapsed ? '-' : '+';
      
      e.stopPropagation();
    };
  });
}

// 渲染JSON结果
function renderJSON(obj) {
  if (obj.error) {
    return `<span style="color: #e53e3e; font-weight: 500;">${obj.error}</span>
            <br><span style="color: #718096; font-size: 14px;">${obj.message}</span>`;
  }
  
  const jsonTree = renderJSONTree(obj);
  return `<div class="json-tree">${jsonTree}</div>`;
}

// 解析按钮点击事件
parseBtn.addEventListener('click', () => {
  const url = urlInput.value.trim();
  
  if (!url) {
    jsonPanel.innerHTML = '<span style="color: #a0aec0; font-style: italic;">请输入要解析的URL</span>';
    return;
  }
  
  // 添加加载状态
  parseBtn.textContent = '解析中...';
  parseBtn.style.opacity = '0.7';
  
  // 模拟异步处理（实际是同步的，但提供更好的用户体验）
  setTimeout(() => {
    const result = parseURL(url);
    jsonPanel.innerHTML = renderJSON(result);
    bindCollapsers(); // 绑定折叠事件
    
    // 恢复按钮状态
    parseBtn.textContent = '→';
    parseBtn.style.opacity = '1';
  }, 100);
});

// 回车键触发解析
urlInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.ctrlKey) {
    parseBtn.click();
  }
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
  // 设置示例URL
  urlInput.placeholder = '在此粘贴 URL...\n\n示例: https://example.com/path?name=张三&age=25&city=北京';
  
  // 聚焦到输入框
  urlInput.focus();
  
  // 显示欢迎信息
  jsonPanel.innerHTML = '<span style="color: #a0aec0; font-style: italic;">输入URL后点击解析按钮开始解析</span>';
}); 