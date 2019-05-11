using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }
    /*protected void Button1_Click(object sender, EventArgs e)
    {
        var act = new DBUtilityV2.MAction("users");   //新建一个数据表的操作对象act

        System.Data.DataTable dt = act.Select();
        Session["userid"] = TextBox1.Text;
        Session["password"] = TextBox2.Text;



        if (TextBox1.Text == "")
        {
            Response.Write("用户名不能为空");
            return;
        }
        else
        {

            for (int i = 0; i < dt.Rows.Count; i++)   //从第0行开始，一直到最后一行，循环比较
            {
                string s = dt.Rows[i][0].ToString();
                string p = dt.Rows[i][1].ToString();
                if (s == TextBox1.Text && p == TextBox2.Text)
                    Response.Redirect("Home.aspx");
            }
            Response.Write("用户名或密码不正确");
            return;
        }
    }
    protected void Button2_Click1(object sender, EventArgs e)
    {
        if (TextBox1.Text == "")
        {
            Response.Write("用户名不能为空");
            return;
        }
        var result = SqlDataSource1.Insert();
        if (result > 0)
        {
            Response.Write("<script>window.confirm('注册成功！请前往登陆');</script>");
        }
        else
        {
            Response.Write("<ccript>alert('注册失败！');</script>");
        }
    }*/
}