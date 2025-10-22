import SectionHeader from "../section-header";

export default function PointCalculateRules() {
  return (
    <section className="space-y-8">
      <SectionHeader title="計分標準" description="計分規則說明。" />

      <div className="space-y-6">
        <div
          className={`
            grid w-full grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
          `}
        >
          <div className="prose text-foreground">
            <h3>登入點數規則</h3>

            <ul>
              <li>
                每天登入可以獲得 <strong>20 點</strong>。
              </li>
              <li>
                每週登入可以獲得 <strong>50 點</strong>。
              </li>
            </ul>
          </div>

          <div className="prose text-foreground">
            <h3>作答點數規則</h3>

            <ul>
              <li>
                首次嘗試題目可以獲得 <strong>30 點</strong>。
              </li>
              <li>
                每日嘗試題目可以獲得 <strong>30 點</strong>。
              </li>
              <li>
                正確答案可以獲得 <strong>60 點</strong>。
              </li>
              <li>
                第一個通過題目的人可以獲得 <strong>80 點</strong>。
              </li>
            </ul>
          </div>

          <div className="prose text-foreground">
            <h3>其他規則</h3>
            <p>這部分是手動發放的。</p>

            <ul>
              <li>
                回報問題和提供系統意見，根據重要性可以獲得 <strong>25 點</strong> 到 <strong>50 點</strong> 不等的點數。
              </li>
              <li>
                到 <a href="https://community.dbplay.app/github" target="_blank">GitHub</a>{" "}
                以 PR 形式貢獻程式碼並獲得接受，可以獲得 <strong>100 點</strong> 到超過 <strong>250 點</strong> 的點數。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
