import "./index.less";

const TypePage: React.FC = () => {
  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <h3>分类</h3>
            </div>
            <div>
              共 <h2>14</h2>个
            </div>
          </div>
        </div>
        <div>
          <div className="entry : ${typeMap}">
            <a>Java</a>
            <div>24</div>
          </div>
        </div>

        <div>
          <div>
            <div className="blog : ${pageInfo.list}">
              <div>
                <h3>
                  <a>title</a>
                </h3>
                <p>description......</p>
                <div>
                  <div>
                    <div>
                      <div>
                        <img src="${blog.user.avatar}" />
                        <div>
                          <a>yiqiandewo</a>
                        </div>
                      </div>
                      <div>
                        <i></i>
                        <span>2020-09-24</span>
                      </div>
                      <div>
                        <i></i>
                        <span>1325</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <a>认知升级</a>
                  </div>
                </div>
              </div>
              <div>
                <a>
                  <img src="${blog.firstPicture}" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* 翻页 */}
      </div>
    </div>
  );
};
export default TypePage;
