const FooterBar: React.FC = () => {
  return (
    <div className="ui inverted vertical segment m-padded-tb-massive">
      <div className="ui center aligned container">
        <div className="ui inverted divided stackable grid">
          <div className="three wide column">
            <div className="ui inverted link list">
              <div className="item">
                <img
                  src="@{/images/MyWeChat.png}"
                  alt=""
                  className="ui rounded inverted image"
                />
              </div>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="m-text-thin m-text-spaced">最新博客</h4>
            <div id="new-blog-container">
              <div className="ui inverted link list m-text-thin m-text-spaced m-opacity-mini">
                <a
                  href="@{/blog/{id}(id=${blog.id})}"
                  target="_blank"
                  className="item"
                >
                  用户故事(User Story)
                </a>
              </div>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="m-text-thin m-text-spaced">联系我</h4>
            <div className="ui inverted link list">
              <a href="#" className="item">
                Email:<span>1429711247@qq.com</span>
              </a>
              <a href="#" className="item">
                QQ:<span>1429711247</span>
              </a>
            </div>
          </div>
          <div className="seven wide column">
            <h4 className="m-text-thin m-text-spaced">Blog</h4>
            <p className="m-text-thin m-text-spaced m-opacity-mini">
              这个人很懒，什么都没有留下...
            </p>
          </div>
        </div>
        <div className="ui inverted section divider">
          <p className="m-text-thin m-text-spaced m-opacity-tiny">
            Copyright @ 2021-2022 KXY Designed by yiqiandewo
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
