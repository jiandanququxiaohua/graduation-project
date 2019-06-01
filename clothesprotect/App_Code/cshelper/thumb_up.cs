using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// thumb_up 的摘要说明
/// </summary>
public class thumb_up
{
    public Result Thumb_up(int userId)
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        var result = new Result<List<Link>>();
        //此处需优化，参数化处理
        var sqltextFomat = "select * from [clothes].[dbo].[link] where userId='{0}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, userId));
        
        var links = dt.ToLinks();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = links;
        result.IsTrue = true;
        return result;
    }

    public Result Thumb_up_delete(int id)
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        var result = new Result<List<Link>>();
        //此处需优化，参数化处理
        var sqltextFomat = "delete from [clothes].[dbo].[link] where id='{0}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, id));

        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }

    public Result Thumb_insert(int userId, int clothId)
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        DbHelperV2 dbhelperv2 = new DbHelperV2();
        var result = new Result<List<Link>>();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[link] (userId, clothId) values ('{0}', '{1}') ";
        dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, userId, clothId));
       
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;
    }
}