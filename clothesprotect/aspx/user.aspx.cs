
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using CYQ.Data.Tool;
using DBUtilityV2;
using Newtonsoft.Json;


public partial class user : System.Web.UI.Page
{
    DbHelperV2 dbhelperv2 = new DbHelperV2();

    int[] _types = new int[] { 1, 2 };
    protected void Page_Load(object sender, EventArgs e)
    {
        var type = Request.Params.Get("type") ?? "";
        var inttype = 0;
        int.TryParse(type, out inttype);
        if (!_types.Contains(inttype))
        {
            //type值不合法
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = "type只能赋值1、2、3、4" }));
            return;
        }
        try
        {
            //查找
            if (inttype == 1)
            {
                var userId = Request.Params.Get("userId") ?? "";
                Response.Write(JsonConvert.SerializeObject(getUser(userId)));
                return;
            }
            if (inttype == 2)
            {
                var userId = Request.Params.Get("userId") ?? "";
                var loginName = Request.Params.Get("name") ?? "";
                var loginPsw = Request.Params.Get("psw") ?? "";
                var alias = Request.Params.Get("alias") ?? "";
                var age = Request.Params.Get("age") ?? "";
                Response.Write(JsonConvert.SerializeObject(updateUser(loginName, loginPsw, alias, age, userId)));
                return;
            }
        }
        catch (Exception ex)
        {
            Response.Write(JsonConvert.SerializeObject(new Result { Code = 500, IsTrue = false, Message = ex.ToString() }));
        }
    }

    /// <summary>
    /// 注册
    /// </summary>
    /// <param name="loginName"></param>
    /// <param name="loginPsw"></param>
    /// <param name="alias"></param>
    /// <param name="age"></param>
    /// <returns></returns>
    private Result updateUser(string loginName, string loginPsw, string alias, string age, string id)
    {
        var result = new Result<List<User>>();
        //此处需优化，参数化处理
        var sqltextFomat = "update [clothes].[dbo].[user] set userName='{0}',password='{1}',age='{2}',alias='{3}' where id={4} ";
        var sqlText = string.Format(sqltextFomat, loginName, loginPsw, age, alias, id);
        dbhelperv2.ExecuteNonQuery(new List<string> { sqlText });
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }

    private Result getUser(string id)
    {
        var result = new Result<List<User>>();
        //此处需优化，参数化处理
        var sqltextFomat = "select * from [clothes].[dbo].[user] where id={0}";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, id));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "查无此人！";
            result.IsTrue = false;
            result.Data = new List<User>();
            return result;
        }
        var users = dt.ToUsers();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = users;
        result.IsTrue = true;
        return result;
    }

}