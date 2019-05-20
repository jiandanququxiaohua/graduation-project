using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// share_cloth 的摘要说明
/// </summary>
public class share_cloth
{
    DbHelperV2 dbhelperv2 = new DbHelperV2();
    public share_cloth()
    {
        //
        // TODO: 在此处添加构造函数逻辑
        //
    }

    public Result share_all_get()
    {
        var result = new Result<List<Share>>();
        //此处需优化，参数化处理
        var sqltextFomat = "select a.id, clothId, date, describe, b.clothName from [clothes].[dbo].[share] as a, [clothes].[dbo].[cloth] as b where a.clothId=b.id";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "没有分享记录！";
            result.IsTrue = false;
            result.Data = new List<Share>();
            return result;
        }
        var shares = dt.ToShares();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = shares;
        result.IsTrue = true;
        return result;
    }

    public Result share_current_get(int userId)
    {
        var result = new Result<List<Share>>();
        //此处需优化，参数化处理
        var sqltextFomat = "select a.id, clothId, date, describe, b.clothName from [clothes].[dbo].[share] as a, [clothes].[dbo].[cloth] as b where a.clothId=b.id and userId='{0}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, userId));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "没有收藏记录！";
            result.IsTrue = false;
            result.Data = new List<Share>();
            return result;
        }
        var shares = dt.ToShares();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = shares;
        result.IsTrue = true;
        return result;
    }
    public Result share_delete(int id)
    {
        var result = new Result<List<Share>>();
        //此处需优化，参数化处理
        var sqltextFomat = "delete from [clothes].[dbo].[share] where id='{0}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, id));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "删除失败！";
            result.IsTrue = false;
            return result;
        }
        var shares = dt.ToShares();
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;

    }

    public Result share_update(string clothId, string describe, int id)
    {
        var result = new Result<List<Share>>();
        //此处需优化，参数化处理
        var sqltextFomat = "update [clothes].[dbo].[share] set clothId='{0}', describe='{1}' where id='{2}'";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, clothId, describe, id));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "更新失败！";
            result.IsTrue = false;
            result.Data = new List<Share>();
            return result;
        }
        var shares = dt.ToShares();
        result.Code = 200;
        result.Message = "成功！";
        result.Data = shares;
        result.IsTrue = true;
        return result;

    }
    public Result share_insert(string clothId, string describe, string date)
    {
        var result = new Result<List<Share>>();
        //此处需优化，参数化处理
        var sqltextFomat = "insert into [clothes].[dbo].[share] (clothId, describe, date) values ('{0}', '{1}', '{2}') ";
        var dt = dbhelperv2.ExecuteDataTable(string.Format(sqltextFomat, clothId, describe, date));
        if (dt == null || dt.Rows.Count == 0)
        {
            //Error todo  
            result.Code = 403;
            result.Message = "插入失败！";
            result.IsTrue = false;
            return result;
        }
        result.Code = 200;
        result.Message = "成功！";
        result.IsTrue = true;
        return result;

    }
}